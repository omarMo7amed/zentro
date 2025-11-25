import { NavItemProps } from "@/widgets/app-sidebar";
import { cn } from "@/shared/lib";
import Link from "next/link";

export default function NavItem({
  icon: Icon,
  label,
  href,
  unread = 0,
  isActive = false,
  isOpen = true,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-md relative group",
        "hover:bg-surface-hover transition-colors",
        isActive && "bg-surface-hover",
        unread > 0 && !isActive && "bg-surface-hover/50",
        isOpen ? "gap-2 px-2 py-1.5" : "justify-center p-2"
      )}
      title={!isOpen ? label : undefined}
    >
      <div className="relative">
        <Icon
          className={cn(
            "w-4 h-4",
            isActive
              ? "text-primary"
              : "text-text-muted group-hover:text-text-primary"
          )}
        />
        {!isOpen && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
        )}
      </div>
      {isOpen && (
        <>
          <span
            className={cn(
              "flex-1 text-sm",
              isActive
                ? "font-semibold text-primary"
                : unread > 0
                ? "font-semibold text-text-primary"
                : "text-text-secondary group-hover:text-text-primary"
            )}
          >
            {label}
          </span>
          {unread > 0 && (
            <span className="px-1.5 py-0.5 text-xs font-medium bg-primary text-text-primary rounded-full min-w-[20px] text-center">
              {unread}
            </span>
          )}
        </>
      )}
    </Link>
  );
}
