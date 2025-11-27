import { cn } from "@/shared/lib";
import { Phone, Video, MoreVertical } from "lucide-react";

export default function Actions() {
  return (
    <div className="flex gap-2">
      <button
        className={cn(
          "p-2 rounded-lg",
          "hover:bg-surface transition-colors",
          "text-text-muted hover:text-text-primary"
        )}
        aria-label="phone-call"
        title="phone-call"
      >
        <Phone className="w-4 h-4" />
      </button>
      <button
        className={cn(
          "p-2 rounded-lg",
          "hover:bg-surface transition-colors",
          "text-text-muted hover:text-text-primary"
        )}
        aria-label="video-call"
        title="video-call"
      >
        <Video className="w-4 h-4" />
      </button>
      <button
        className={cn(
          "p-2 rounded-lg",
          "hover:bg-surface transition-colors",
          "text-text-muted hover:text-text-primary"
        )}
        aria-label="more"
        title="more"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
    </div>
  );
}
