"use client";

import { MessageList } from "@/widgets/message-list";
import { useChatMessages } from "@/entities/message";
import { ChatAreaProps } from "../types";

export default function ChatArea({ chatId }: ChatAreaProps) {
  const { messages, isLoading, onLoadMore, hasMore, page, error, firstLoad } =
    useChatMessages(chatId);

  if (error)
    return (
      <div className="flex-1 flex items-center justify-center text-text-muted">
        Error: {error.message}
      </div>
    );

  if (isLoading && firstLoad) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center">
        <p className="text-text-muted">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-background flex-1 overflow-y-auto">
      <MessageList
        messages={messages}
        onLoadMore={onLoadMore}
        hasMore={hasMore}
        isLoading={isLoading}
        page={page}
      />
    </div>
  );
}
