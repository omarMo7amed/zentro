"use client";
import { useCallback, useRef } from "react";
import { UseInfiniteScrollProps } from "../types/UseInfiniteScrollProps";

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  rootMargin = "100px",
  threshold = 1.0,
}: UseInfiniteScrollProps) {
  const observer = useRef<IntersectionObserver | null>(null);
  const isLoadingRef = useRef(false);
  const wasIntersecting = useRef(false);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      // Update the ref to track current loading state
      isLoadingRef.current = isLoading;

      if (isLoading || !hasMore) {
        // Disconnect observer when loading or no more data
        if (observer.current) {
          observer.current.disconnect();
          observer.current = null;
        }
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          const isCurrentlyIntersecting = entries[0].isIntersecting;

          // Only trigger load when:
          // 1. Element enters the viewport (transition from not-intersecting to intersecting)
          // 2. Not currently loading
          // 3. Has more data to load
          if (
            isCurrentlyIntersecting &&
            !wasIntersecting.current &&
            !isLoadingRef.current &&
            hasMore
          ) {
            isLoadingRef.current = true;
            onLoadMore();
          }

          wasIntersecting.current = isCurrentlyIntersecting;
        },
        {
          rootMargin,
          threshold,
        }
      );

      if (node) {
        // Reset intersection state when observing a new node
        wasIntersecting.current = false;
        observer.current.observe(node);
      }
    },
    [onLoadMore, hasMore, isLoading, rootMargin, threshold]
  );

  return { lastElementRef };
}
