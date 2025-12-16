import { cn } from "@/shared/lib";
import Actions from "./Actions";
import ChatInfo from "./ChatInfo";
import { Chat } from "@/entities/chat";

export default function ChatHeader({ chat }: { chat: Chat }) {
  return (
    <div
      className={cn(
        "h-14 border-b border-border",
        "bg-background-elevated",
        "flex items-center justify-between px-4"
      )}
    >
      <ChatInfo chat={chat} />
      <Actions
        chatId={chat.id}
        recipientId={String(chat.id)}
        recipientName={chat.name}
      />
    </div>
  );
}
