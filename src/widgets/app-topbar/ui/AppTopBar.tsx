"use client";

import {
  Actions,
  ActiveButton,
  getPageTitle,
  SearchBar,
} from "@/widgets/app-topbar";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib";
import { Bell, MoreVertical, Phone, Video } from "lucide-react";

export default function AppTopBar() {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "h-14 bg-background-elevated border-b border-border",
        "flex items-center justify-between px-4 gap-4"
      )}
    >
      {/* Page Title */}
      <h1
        className={cn(
          "text-lg font-semibold text-text-primary",
          "flex-1 min-w-0"
        )}
      >
        {getPageTitle(pathname)}
      </h1>

      {/* Search */}
      <SearchBar />

      {/* Actions */}
      <Actions>
        <ActiveButton icon={Phone} label="Voice call" />
        <ActiveButton icon={Video} label="Video call" />
        <ActiveButton icon={Bell} label="Notifications" badge={5} />
        <ActiveButton icon={MoreVertical} label="More options" />
      </Actions>
    </header>
  );
}
