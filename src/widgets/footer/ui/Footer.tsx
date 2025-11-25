"use client";

import { SpecialLogo } from "@/widgets/footer";
import Button from "@/shared/ui/Button";
import { cn, useIntersectionObserver } from "@/shared/lib";
export default function Footer() {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <footer ref={ref}>
      <div
        className={cn(
          "h-[400px] border-t-2 border-primary rounded-tr-lg rounded-tl-lg",
          "overflow-hidden py-20"
        )}
      >
        <SpecialLogo hasIntersected={hasIntersected} />
        <div className={cn("flex items-center justify-center gap-4")}>
          <Button variant="primary">Get Started</Button>
          <Button variant="outline">Contact Us</Button>
        </div>
      </div>
    </footer>
  );
}
