import { cn } from "@/shared/lib";
import { Hash } from "lucide-react";

export default function ChannelButton() {
  const handleClick = () => {
    // TODO: Implement channel reference functionality
    console.log("Channel button clicked");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "p-2 rounded-lg",
        "hover:bg-surface-hover transition-colors",
        "text-text-muted hover:text-text-primary"
      )}
      aria-label="Reference a channel"
    >
      <Hash className="w-4 h-4" />
    </button>
  );
}
