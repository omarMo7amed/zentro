import {
  History,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";

export const mainNavItems = [
  { icon: MessageSquare, label: "Chats", href: "/main/chats" },
  { icon: MessageSquare, label: "Channels", href: "/main/channels" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/main/dashboard" },
  { icon: History, label: "Call History", href: "/main/history" },
  { icon: Settings, label: "Settings", href: "/main/settings" },
];
