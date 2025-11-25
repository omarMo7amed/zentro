import { cn } from "@/shared/lib";

export default function SpecialLogo({
  hasIntersected,
}: {
  hasIntersected: boolean;
}) {
  return (
    <div className="flex items-center justify-center h-[200px]">
      <div className={cn("relative")}>
        <p
          className={cn(
            "font-logo text-6xl md:text-9xl gradient-text whitespace-nowrap",
            "md:transform md:duration-1000 md:ease-in-out md:translate-x-30",
            hasIntersected && "md:translate-x-0 md:scale-125"
          )}
        >
          Zentro
        </p>

        <p
          className={cn(
            "md:absolute md:top-0 md:left-0 md:w-full md:h-full",
            "md:bg-background md:block hidden ",
            "md:transform md:duration-2000 md:ease-in-out md:translate-x-30",
            hasIntersected && "md:translate-x-400"
          )}
        ></p>
      </div>
    </div>
  );
}
