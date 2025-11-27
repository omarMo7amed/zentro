import { cn } from "@/shared/lib";
import { Send, Smile, Paperclip } from "lucide-react";

export default function MessageInput() {
  return (
    <div className="p-4 border-t border-border bg-background-elevated">
      <div
        className={cn(
          "flex items-end gap-2 p-3 rounded-lg",
          "bg-surface border border-border",
          "focus-within:border-primary transition-colors"
        )}
      >
        <div className="flex gap-1">
          <button
            className={cn(
              "p-2 rounded-lg",
              "hover:bg-surface-hover transition-colors",
              "text-text-muted hover:text-text-primary"
            )}
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <button
            className={cn(
              "p-2 rounded-lg",
              "hover:bg-surface-hover transition-colors",
              "text-text-muted hover:text-text-primary"
            )}
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none py-2"
        />
        <button
          className={cn(
            "p-2 rounded-lg shrink-0",
            "bg-primary hover:bg-primary/90",
            "text-white",
            "transition-colors"
          )}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
