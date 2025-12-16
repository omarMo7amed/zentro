import { getVariantClasses, getRingClasses } from "@/shared/lib/getButtonClass";
import { cn } from "@/shared/lib";
import { ButtonProps } from "../types";

export function Button({
  children,
  variant = "primary",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-md font-medium transition-all cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "active:scale-95 active:ring-4",
        getVariantClasses(variant),
        getRingClasses(variant),
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
