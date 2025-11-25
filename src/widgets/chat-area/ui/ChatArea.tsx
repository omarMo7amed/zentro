import { cn } from "@/shared/lib/cn";
import { Smile, Paperclip, Send, AtSign, Hash } from "lucide-react";

export default function ChatArea() {
  const messages = [
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "from-purple-500 to-pink-500",
      time: "10:30 AM",
      content: "Hey team! Just pushed the new design updates to staging 🎨",
    },
    {
      id: 2,
      author: "Mike Ross",
      avatar: "from-blue-500 to-cyan-500",
      time: "10:32 AM",
      content: "Looks great! I'll review the changes this afternoon",
    },
    {
      id: 3,
      author: "Emma Wilson",
      avatar: "from-green-500 to-emerald-500",
      time: "10:35 AM",
      content: "Quick question - are we still using the new color palette?",
    },
    {
      id: 4,
      author: "You",
      avatar: "from-primary to-blue-500",
      time: "10:37 AM",
      content: "Yes! Check the globals.css file for all the design tokens",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Date Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-medium text-text-muted">Today</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>

      {/* Message Input */}
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
    </div>
  );
}

function Message({
  author,
  avatar,
  time,
  content,
}: {
  author: string;
  avatar: string;
  time: string;
  content: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-3 group hover:bg-surface/50 -mx-2 px-2 py-1 rounded-lg transition-colors"
      )}
    >
      <div
        className={cn("w-9 h-9 rounded-lg bg-linear-to-br shrink-0", avatar)}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-text-primary text-sm">
            {author}
          </span>
          <span className="text-xs text-text-muted">{time}</span>
        </div>
        <p className="text-sm text-text-secondary mt-1">{content}</p>
      </div>
    </div>
  );
}

function InputAction({
  icon: Icon,
  label,
}: {
  icon: typeof Smile;
  label: string;
}) {
  return (
    <button
      className={cn(
        "p-2 rounded-md",
        "hover:bg-surface-hover transition-colors",
        "text-text-muted hover:text-text-primary"
      )}
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
