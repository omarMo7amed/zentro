import { useVirtualizer } from "@tanstack/react-virtual";
import { ChatItem } from "@/entities/chat";
import { useRef } from "react";

import { ChatListProps } from "../types";

import { useInfiniteScroll } from "@/shared";
import { Loading } from "@/shared";

export default function ChatList({
  chats,
  selectedChatId,
  onChatSelect,
  hasMore = false,
  isLoading = false,
  onLoadMore = () => {},
}: ChatListProps) {
  const refParent = useRef<HTMLDivElement>(null);
  const { lastElementRef } = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading,
  });

  const virtualizedChats = useVirtualizer({
    count: chats.length,
    getScrollElement: () => refParent.current,
    estimateSize: () => 72,
    overscan: 5,
    getItemKey: (index) => chats[index].id,
  });

  return (
    <div ref={refParent} className="flex-1 overflow-y-auto">
      <div
        style={{
          height: `${virtualizedChats.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizedChats.getVirtualItems().map((virtualItem) => {
          const chat = chats[virtualItem.index];
          const isActive = selectedChatId === chat.id;

          return (
            <div
              ref={
                virtualItem.index === chats.length - 1 ? lastElementRef : null
              }
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
                transition: "cubic-bezier(0.4, 0, 0.2, 1) 0.3s all",
                zIndex: isActive ? 1 : 0,
              }}
            >
              <ChatItem
                chat={chat}
                isActive={isActive}
                onClick={() => onChatSelect(chat.id)}
              />
            </div>
          );
        })}
      </div>
      {isLoading && <Loading>Loading...</Loading>}

      {!hasMore && (
        <div className="relative flex items-center justify-center mt-5">
          <p className="text-sm text-text-secondary bg-surface ">
            No more chats
          </p>
        </div>
      )}
    </div>
  );
}
