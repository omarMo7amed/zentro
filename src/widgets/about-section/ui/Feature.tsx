import { FeatureProps } from "@/widgets/about-section";
import { HighLight } from "@/widgets/about-section";
import { cn } from "@/shared/lib";

export default function Feature({
  feature,
  registerFeatureRef,
  activeIndex,
  index,
}: FeatureProps) {
  const Icon = feature.icon;

  return (
    <div
      ref={(el) => {
        registerFeatureRef(index, el);
      }}
      className={cn(
        "min-h-screen flex items-center",
        "transition-opacity duration-700",
        activeIndex === index ? "opacity-100" : "opacity-30"
      )}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div
            className={cn(
              "w-12 h-12 rounded-xl",
              "bg-linear-to-br from-primary to-blue-500",
              "flex items-center justify-center",
              "shadow-lg shadow-primary/30"
            )}
          >
            <Icon className="w-6 h-6 text-text-primary" />
          </div>
          <h3
            className={cn(
              "text-2xl md:text-4xl text-text-primary font-bold leading-tight"
            )}
          >
            {feature.title}
          </h3>
        </div>

        <p className="text-xl md:text-xl text-text-secondary">
          {feature.description}
        </p>

        <ul className="space-y-2 ">
          <HighLight highlights={feature.highlights} />
        </ul>
      </div>
    </div>
  );
}
