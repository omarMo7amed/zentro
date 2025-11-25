import { cn } from "@/shared/lib";

export default function HighLight({ highlights }: { highlights: string[] }) {
  return (
    <>
      {highlights.map((highlight, idx) => (
        <li key={idx} className="flex items-center gap-4">
          <div className={cn("w-2 h-2 rounded-full", "bg-primary")} />
          <span className="text-lg text-text-muted">{highlight}</span>
        </li>
      ))}
    </>
  );
}
