import { cn } from "@/shared/lib";
import Image from "next/image";
import { FeatureType } from "@/widgets/about-section";

export default function Box({ feature }: { feature: FeatureType }) {
  return (
    <div className={cn("rounded-lg bg-surface p-4")}>
      <div className={cn("flex flex-col gap-5")}>
        <div className={cn("relative w-full h-[300px]")}>
          <Image src={feature.image} fill alt="" />
        </div>
        <div className={cn("max-w-96 space-y-4")}>
          <h3
            className={cn("text-2xl text-text-primary font-bold leading-tight")}
          >
            {feature.title}
          </h3>
          <p className={cn("text-text-muted text-md")}>{feature.description}</p>
        </div>
      </div>
    </div>
  );
}
