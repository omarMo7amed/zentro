import { cn } from "@/shared/lib";
import { AtSign } from "lucide-react";

export default function MentionButton() {
  const handleClick = () => {
    // TODO: Implement mention functionality
    console.log("Mention button clicked");
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
      aria-label="Mention someone"
    >
      <AtSign className="w-4 h-4" />
    </button>
  );
}
