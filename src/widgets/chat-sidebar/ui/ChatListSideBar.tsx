import { ChatList, ChatListProps } from "@/widgets/chat-list";
import { AddFriend } from "@/features/add-friend";
import { cn } from "@/shared/lib";

export default function ChatListSidebar({
  chats,
  selectedChatId,
  onChatSelect,
  hasMore,
  isLoading,
  onLoadMore,
}: ChatListProps) {
  return (
    <div
      className={cn(
        "w-80 border-r border-border",
        "bg-surface",
        "flex flex-col"
      )}
    >
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onChatSelect={onChatSelect}
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={onLoadMore}
      />

      <AddFriend />
    </div>
  );
}
