import { ChatListProps } from "../types";
import ChatListItem from "./ChatListItem";

export default function ChatList({
  chats,
  selectedChatId,
  onChatSelect,
}: ChatListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isActive={selectedChatId === chat.id}
          onClick={() => onChatSelect(chat.id)}
        />
      ))}
    </div>
  );
}
