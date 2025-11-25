import { cn } from "@/shared/lib";
import { AboutImage } from "@/widgets/about-section";

export default function RightSide({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative h-[600vh]">
      <div className="sticky top-20 flex items-center">
        <div
          className={cn(
            "relative w-full h-[80vh] rounded-3xl overflow-hidden",
            "border border-white/10",
            "shadow-2xl"
          )}
        >
          <AboutImage activeIndex={activeIndex} />
        </div>
      </div>
    </div>
  );
}
