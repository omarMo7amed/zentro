import { ZentroLogo } from "@/shared/ui/logo";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/lib";

export default function Header() {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full px-4 py-4 bg-background-elevated",
        "z-10"
      )}
    >
      <div
        className={cn("max-w-7xl flex items-center justify-between mx-auto")}
      >
        <ZentroLogo />

        <div className="flex gap-4">
          <Button variant="primary">Sign In</Button>
          <Button variant="outline">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
