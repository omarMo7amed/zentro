import { cn } from "@/shared/lib";
import Image from "next/image";
import { features } from "@/widgets/about-section";

export default function AboutImage({ activeIndex }: { activeIndex: number }) {
  return (
    <>
      {features.map((feature, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0",
            "transition-opacity duration-700",
            activeIndex === index ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover"
          />
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-br from-primary-500/10 to-blue-500/10"
            )}
          />
        </div>
      ))}
    </>
  );
}
