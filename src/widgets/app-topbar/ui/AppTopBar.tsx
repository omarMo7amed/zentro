"use client";

import { cn } from "@/shared/lib";
import { Search, Bell, Phone, Video, MoreVertical } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AppTopBar() {
  const pathname = usePathname();

  // Get page title based on route
  const getPageTitle = () => {
    if (pathname.startsWith("/main/channels")) return "Channels";
    if (pathname === "/main/dashboard") return "Dashboard";
    if (pathname === "/main/history") return "Call History";
    if (pathname === "/main/settings") return "Settings";
    return "Zentro";
  };

  return (
    <header
      className={cn(
        "h-14 bg-background-elevated border-b border-border",
        "flex items-center justify-between px-4 gap-4"
      )}
    >
      {/* Page Title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <h1 className="text-lg font-semibold text-text-primary">
          {getPageTitle()}
        </h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center max-w-md">
        <div
          className={cn(
            "flex items-center gap-2 w-full",
            "bg-surface rounded-lg px-3 py-2",
            "border border-border focus-within:border-primary transition-colors"
          )}
        >
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
          />
          <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono text-text-muted bg-background-elevated border border-border rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ActionButton icon={Phone} label="Voice call" />
        <ActionButton icon={Video} label="Video call" />
        <ActionButton icon={Bell} label="Notifications" badge={5} />
        <ActionButton icon={MoreVertical} label="More options" />
      </div>
    </header>
  );
}

function ActionButton({
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
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}
