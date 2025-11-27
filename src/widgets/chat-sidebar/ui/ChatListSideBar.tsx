import { AddFriend } from "@/features/add-friend";
import { cn } from "@/shared/lib";
import ChatList from "./ChatList";
import { ChatListProps } from "../types";

export default function ChatListSidebar({
  chats,
  selectedChatId,
  onChatSelect,
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
      />

      <AddFriend />
    </div>
  );
}
