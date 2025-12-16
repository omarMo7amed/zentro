"use client";

import { useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { MessageWithId, UseMessageListScrollProps } from "../types";

/**
 * my Problems to solve:
 * 1. Scroll to bottom on initial load
 * 2. Scroll to bottom when new message is sent/received
 * 3. Maintain scroll position when older messages are prepended
 * 4. Detect when user scrolls to top → trigger loading older messages
 * 5. Prevent scroll jump when older messages are loaded
 * 6. reset state when chat changes
 */

export default function useMessageListScroll<T extends MessageWithId>({
  messages,
  virtualizer,
  parentRef,
  hasMore,
  isLoading,
  page,
  onLoadMore,
}: UseMessageListScrollProps<T>) {
  const prevMessagesLengthRef = useRef(0);
  const isInitialMount = useRef(true);
  const isLoadingMoreRef = useRef(false);
  const hasTriggeredLoadRef = useRef(false);
  const firstVisibleMessageIdRef = useRef<string | number | null>(null);
  const lastMessageIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        hasTriggeredLoadRef.current = false;
        isLoadingMoreRef.current = false;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Handle scroll to detect when user reaches the top
  const handleScroll = useCallback(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement) return;
    if (isLoadingMoreRef.current || !hasMore || isLoading) return;
    if (hasTriggeredLoadRef.current) return;

    const { scrollTop } = scrollElement;
    const threshold = 100;

    if (scrollTop <= threshold) {
      // Store the first visible message ID for scroll restoration
      const virtualItems = virtualizer.getVirtualItems();
      if (virtualItems.length > 0 && messages.length > 0) {
        const firstVisibleIndex = virtualItems[0].index;
        firstVisibleMessageIdRef.current = messages[firstVisibleIndex]?.id;
      }

      isLoadingMoreRef.current = true;
      hasTriggeredLoadRef.current = true;
      onLoadMore();
    }
  }, [hasMore, isLoading, onLoadMore, messages, virtualizer, parentRef]);

  // Attach scroll listener
  useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement) return;

    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [handleScroll, parentRef]);

  // Handle scroll behavior when messages change
  useLayoutEffect(() => {
    if (messages.length === 0) return;

    const prevLength = prevMessagesLengthRef.current;
    const currentLength = messages.length;
    const currentLastMessageId = messages[messages.length - 1]?.id;
    const prevLastMessageId = lastMessageIdRef.current;

    // Initial mount - scroll to bottom
    if (isInitialMount.current) {
      const scrollRef = parentRef.current;
      if (scrollRef) {
        requestAnimationFrame(() => {
          scrollRef.scrollTo({ top: scrollRef.scrollHeight });
          isInitialMount.current = false;
        });
      }
      prevMessagesLengthRef.current = currentLength;
      lastMessageIdRef.current = currentLastMessageId;
      return;
    }

    // No change in length - just update refs
    if (currentLength === prevLength) {
      lastMessageIdRef.current = currentLastMessageId;
      return;
    }

    // New message appended -> scroll to bottom
    if (
      currentLength > prevLength &&
      currentLastMessageId !== prevLastMessageId
    ) {
      const scrollRef = parentRef.current;
      if (scrollRef) {
        requestAnimationFrame(() => {
          scrollRef.scrollTo({
            top: scrollRef.scrollHeight,
            behavior: "smooth",
          });
        });
      }
    } else if (
      currentLength > prevLength &&
      firstVisibleMessageIdRef.current !== null
    ) {
      /**I can optimize this by storing the previous length and calculating the new index with that
       * solution with copilot:
       * const newIndex = messages.findIndex((msg) => msg.id === firstVisibleMessageIdRef.current);
       * **/

      // my solution:
      const newIndex = messages.length - prevMessagesLengthRef.current;

      requestAnimationFrame(() => {
        virtualizer.scrollToIndex(newIndex, { align: "start" });
      });

      firstVisibleMessageIdRef.current = null;
    }

    prevMessagesLengthRef.current = currentLength;
    lastMessageIdRef.current = currentLastMessageId;
  }, [messages, virtualizer, parentRef]);

  // Reset state when chat changes (page goes back to 1)
  useEffect(() => {
    if (page === 1) {
      isInitialMount.current = true;
      prevMessagesLengthRef.current = 0;
      hasTriggeredLoadRef.current = false;
      isLoadingMoreRef.current = false;
      firstVisibleMessageIdRef.current = null;
      lastMessageIdRef.current = null;
    }
  }, [page]);
}
