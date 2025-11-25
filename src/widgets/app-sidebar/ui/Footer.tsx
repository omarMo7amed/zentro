import { cn } from "@/shared/lib/cn";

export default function Footer() {
  return (
    <div
      className={cn(
        "p-3 border-t border-border",
        "flex items-center gap-3",
        "hover:bg-surface-hover transition-colors cursor-pointer"
      )}
    >
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-blue-500" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-surface" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">You</p>
        <p className="text-xs text-text-muted truncate">Online</p>
      </div>
    </div>
  );
}
