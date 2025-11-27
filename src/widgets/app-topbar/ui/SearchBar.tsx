import { cn } from "@/shared/lib";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center max-w-96">
      <div
        className={cn(
          "flex items-center gap-2 ",
          "bg-surface rounded-lg px-3 py-2",
          "border border-border focus-within:border-primary transition-colors"
        )}
      >
        <Search className={cn("w-4 h-4 text-text-muted")} />
        <input
          type="text"
          placeholder="Search..."
          className={cn(
            "flex-1 bg-transparent text-sm text-text-primary",
            "placeholder:text-text-muted outline-none"
          )}
        />
      </div>
    </div>
  );
}
