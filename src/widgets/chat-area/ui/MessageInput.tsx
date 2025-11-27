import { cn } from "@/shared/lib";
import InputAction from "./InputAction";
import { AtSign, Hash, Paperclip, Send, Smile } from "lucide-react";
export default function MessageInput() {
  return (
    <div className="p-4 border-t border-border bg-background-elevated">
      <div
        className={cn(
          "bg-surface rounded-lg border border-border",
          "focus-within:border-primary transition-colors"
        )}
      >
        <textarea
          placeholder="Type a message..."
          className={cn(
            "w-full px-4 py-3 bg-transparent",
            "text-sm text-text-primary placeholder:text-text-muted",
            "outline-none resize-none min-h-[60px] max-h-[200px]"
          )}
        />
        <div className="flex items-center justify-between px-3 py-2 border-t border-border">
          <div className="flex items-center gap-1">
            <InputAction icon={Paperclip} label="Attach file" />
            <InputAction icon={Smile} label="Add emoji" />
            <InputAction icon={AtSign} label="Mention someone" />
            <InputAction icon={Hash} label="Add channel reference" />
          </div>
          <button
            className={cn(
              "px-4 py-1.5 rounded-md",
              "bg-primary hover:bg-primary/90",
              "text-white text-sm font-medium",
              "transition-colors flex items-center gap-2"
            )}
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
