import { LucideIcon } from "lucide-react";

export interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  unread?: number;
  isActive?: boolean;
  isOpen?: boolean;
}
