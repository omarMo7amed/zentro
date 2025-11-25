import { Feature, features } from "@/widgets/about-section";
export default function LeftSide({
  registerFeatureRef,
  activeIndex,
}: {
  registerFeatureRef: (index: number, el: HTMLDivElement | null) => void;
  activeIndex: number;
}) {
  return (
    <div className="md:space-y-[100vh]">
      {features.map((feature, index) => (
        <Feature
          key={index}
          feature={feature}
          registerFeatureRef={registerFeatureRef}
          activeIndex={activeIndex}
          index={index}
        />
      ))}
    </div>
  );
}
