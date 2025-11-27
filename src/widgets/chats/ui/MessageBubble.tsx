import { cn } from "@/shared/lib";
import type { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={cn("flex gap-3", message.isMe && "flex-row-reverse")}>
      {!message.isMe && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold shrink-0">
          {message.author[0]}
        </div>
      )}
      <div className={cn("flex flex-col gap-1", message.isMe && "items-end")}>
        <div
          className={cn(
            "px-4 py-2 rounded-2xl max-w-md",
            message.isMe
              ? "bg-primary text-white rounded-br-md"
              : "bg-surface text-text-primary rounded-bl-md"
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <span className="text-xs text-text-muted">{message.time}</span>
      </div>
    </div>
  );
}
