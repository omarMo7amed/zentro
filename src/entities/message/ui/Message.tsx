import type { MessageType } from "@/entities/message";
import { cn, formatMessageTime } from "@/shared/lib";

export default function Message({ message }: { message: MessageType }) {
  return (
    <div
      className={cn(
        "flex gap-3 hover:bg-surface/50",
        "-mx-2 px-2 py-1 rounded-lg transition-colors max-w-10/12"
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-lg bg-linear-to-br",
          message.isMe ? "bg-primary" : "bg-red-300"
        )}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-text-primary text-sm">
            {message.author}
          </span>
          <span className="text-xs text-text-muted">
            {formatMessageTime(message.createdAt)}
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1 whitespace-pre-wrap wrap-break-word">
          {message.content}
        </p>
      </div>
    </div>
  );
}
