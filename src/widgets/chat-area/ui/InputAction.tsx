import { cn } from "@/shared/lib";
import { Smile } from "lucide-react";

export default function InputAction({
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
