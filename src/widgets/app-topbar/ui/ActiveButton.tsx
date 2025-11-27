import { Search } from "lucide-react";
import { cn } from "@/shared/lib";

export default function ActiveButton({
  icon: Icon,
  label,
  badge,
}: {
  icon: typeof Search;
  label: string;
  badge?: number;
}) {
  return (
    <button
      className={cn(
        "relative p-2 rounded-lg",
        "hover:bg-surface transition-colors",
        "text-text-muted hover:text-text-primary"
      )}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
      {badge && badge > 0 && (
        <span
          className={cn(
            "flex items-center justify-center",
            "absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500",
            "text-white text-[10px] font-medium rounded-full"
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
