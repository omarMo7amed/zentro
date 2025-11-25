import { ZentroLogo } from "@/shared/ui/logo";
import { cn } from "@/shared/lib/cn";
import { ChevronLeft } from "lucide-react";

export default function Header({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={cn(
        "p-4 border-b border-border",
        "flex items-center justify-between",
        "transition-colors"
      )}
    >
      {isOpen && <ZentroLogo />}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "p-2 rounded-md hover:bg-surface-hover transition-all",
          "text-text-muted hover:text-text-primary",
          !isOpen && "mx-auto"
        )}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <ChevronLeft
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            !isOpen && "rotate-180"
          )}
        />
      </button>
    </div>
  );
}
