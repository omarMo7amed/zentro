"use client";
import { channels, NavItem } from "@/widgets/app-sidebar";
import { Hash } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Channels({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  return (
    <div className="space-y-1">
      {isOpen && (
        <div className="px-2 py-1">
          <span className="text-xs font-semibold text-text-muted uppercase">
            Channels
          </span>
        </div>
      )}
      {channels.map((channel) => (
        <NavItem
          key={channel.name}
          icon={Hash}
          label={channel.name}
          href={`/main/channels/${channel.name}`}
          unread={channel.unread}
          isActive={pathname === `/main/channels/${channel.name}`}
          isOpen={isOpen}
        />
      ))}
    </div>
  );
}
