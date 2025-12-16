import { useState, useEffect, useRef, useCallback } from "react";

import { fetchMessagesByChatId } from "../api";
import { MessageType } from "../types";

import { socketHelpers } from "@/shared/lib";
import { useSocket } from "@/shared/lib";

export function useChatMessages(chatId: number) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const { socket } = useSocket();
  const prevChatIdRef = useRef<number>(chatId);
  const firstLoad = page === 1;

  // Track if a load is in progress to prevent duplicate calls
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (prevChatIdRef.current !== chatId) {
      setMessages([]);
      setPage(1);
      setError(null);
      setHasMore(false);
      isLoadingRef.current = false;
      prevChatIdRef.current = chatId;
    }
  }, [chatId]);

  useEffect(() => {
    const loadMessages = async () => {
      // Prevent duplicate loads
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;

      try {
        setIsLoading(true);
        const { messages: newMessages, pagination } =
          await fetchMessagesByChatId(chatId, page);

        setMessages((prev) => {
          if (page === 1) {
            return newMessages;
          } else {
            // Prepend older messages, avoiding duplicates
            const existingIds = new Set(prev.map((m) => m.id));
            const uniqueNewMessages = newMessages.filter(
              (m) => !existingIds.has(m.id)
            );
            return [...uniqueNewMessages, ...prev];
          }
        });

        setHasMore(pagination.hasMore);
        setPageSize(pagination.pageSize);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch messages")
        );
      } finally {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    };

    loadMessages();
  }, [chatId, page]);

  useEffect(() => {
    if (!socket || chatId === undefined || chatId === null) return;

    socketHelpers.joinChat(socket, chatId);

    const handleNewMessage = (newMessage: MessageType) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socketHelpers.leaveChat(socket, chatId);
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, chatId]);

  const onLoadMore = useCallback(() => {
    // Multiple guards to prevent runaway loading
    if (!hasMore || isLoading || isLoadingRef.current) {
      return;
    }
    setPage((prev) => prev + 1);
  }, [hasMore, isLoading]);

  return {
    messages,
    isLoading,
    hasMore,
    error,
    setMessages,
    onLoadMore,
    pageSize,
    page,
    firstLoad,
  };
}
