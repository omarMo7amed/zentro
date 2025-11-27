import { cn } from "@/shared/lib";
import Actions from "./Actions";
import ChatInfo from "./ChatInfo";
import { ChatHeaderProps } from "../types";

export default function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <div
      className={cn(
        "h-14 border-b border-border",
        "bg-background-elevated",
        "flex items-center justify-between px-4"
      )}
    >
      <ChatInfo chat={chat} />
      <Actions />
    </div>
  );
}
