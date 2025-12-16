import { Chat } from "@/shared/types/chat";
import { cn, getAvatarColor } from "@/shared/lib";

export default function ChatInfo({ chat }: { chat: Chat }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm",
            getAvatarColor(chat.id.toString())
          )}
        >
          {chat.name[0]}
        </div>
        {chat.online && (
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background-elevated" />
        )}
      </div>
      <div>
        <h2 className="font-semibold text-text-primary text-sm">{chat.name}</h2>
        <p className="text-xs text-text-muted">
          {chat.online ? "Active now" : "Offline"}
        </p>
      </div>
    </div>
  );
}
