import { cn } from "@/shared/lib";
import { ChatListItemProps } from "../types";

export default function ChatListItem({
  chat,
  isActive,
  onClick,
}: ChatListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-3 w-full cursor-pointer border-b border-border",
        "hover:bg-surface-hover transition-colors",
        isActive && "bg-surface-hover border-l-2 border-l-primary"
      )}
      aria-label={chat.name}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            {chat.name[0]}
          </div>

          {chat.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface" />
          )}
        </div>

        <div className="flex-1  min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              className={cn(
                "font-medium text-sm truncate",
                isActive ? "text-primary" : "text-text-primary"
              )}
            >
              {chat.name}
            </span>

            <span className="text-xs text-text-muted shrink-0">
              {chat.time}
            </span>
          </div>

          <p className="text-sm text-text-muted truncate text-left">
            {chat.lastMessage}
          </p>
        </div>

        {chat.unread > 0 && (
          <div className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-medium">
            {chat.unread}
          </div>
        )}
      </div>
    </button>
  );
}
