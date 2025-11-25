"use client";
import { mainNavItems } from "../lib/main-navitems";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

export default function Navigation({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  return (
    <div className="space-y-1">
      {mainNavItems.map((item) => (
        <NavItem
          key={item.href}
          icon={item.icon}
          label={item.label}
          href={item.href}
          isActive={pathname === item.href}
          isOpen={isOpen}
        />
      ))}
    </div>
  );
}
