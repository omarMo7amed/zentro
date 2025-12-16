import { isSameDayDate, formatDateDivider } from "@/shared/lib";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { Message } from "@/entities/message";
import { MessageListProps } from "../types";
import { Loading } from "@/shared";
import useMessageListScroll from "../model/useScrollBased";

export default function MessageList({
  messages,
  onLoadMore = () => {},
  hasMore = false,
  isLoading = false,
  page = 1,
}: MessageListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    getItemKey: (index) => messages[index]?.id ?? index,
    overscan: 5,
  });

  // Custom hook handles all scroll logic
  useMessageListScroll({
    messages,
    virtualizer,
    parentRef,
    hasMore,
    isLoading,
    page,
    onLoadMore,
  });

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-muted">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div ref={parentRef} className="flex-1 overflow-y-auto p-4">
      {/* Loading indicator at top when fetching older messages */}
      {isLoading && hasMore && (
        <div className="sticky top-0 z-10">
          <Loading>Loading older messages...</Loading>
        </div>
      )}

      {/* End of conversation indicator */}
      {!hasMore && messages.length > 0 && (
        <div className="flex items-center justify-center pt-4 pb-6 mb-10 border-b border-border">
          <p className="text-sm text-text-muted">
            You have reached the beginning of the conversation.
          </p>
        </div>
      )}

      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const message = messages[virtualItem.index];
          if (!message) return null;

          const previousMessage = messages[virtualItem.index - 1];
          const showDivider =
            !previousMessage ||
            !isSameDayDate(message.createdAt, previousMessage.createdAt);

          return (
            <div
              key={virtualItem.key}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {showDivider && (
                <div className="flex items-center justify-center my-4">
                  <div className="bg-surface-hover px-3 py-1 rounded-full text-xs text-text-muted font-medium">
                    {formatDateDivider(message.createdAt)}
                  </div>
                </div>
              )}
              <Message message={message} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
