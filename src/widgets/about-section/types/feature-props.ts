import { FeatureType } from "@/widgets/about-section/types/feature-type";

export interface FeatureProps {
  feature: FeatureType;
  registerFeatureRef: (index: number, el: HTMLDivElement | null) => void;
  activeIndex: number;
  index: number;
}
