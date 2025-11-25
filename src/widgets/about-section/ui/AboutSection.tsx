"use client";

import { cn } from "@/shared/lib";
import { features, RightSide, Box, LeftSide } from "@/widgets/about-section";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Callback to register feature refs safely
  const registerFeatureRef = (index: number, el: HTMLDivElement | null) => {
    featureRefs.current[index] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={cn("py-20 bg-background-elevated")}>
      <div className={cn("max-w-7xl mx-auto px-8")}>
        <div className={cn("hidden lg:grid lg:grid-cols-2 lg:gap-16")}>
          <LeftSide
            registerFeatureRef={registerFeatureRef}
            activeIndex={activeIndex}
          />
          <RightSide activeIndex={activeIndex} />
        </div>

        {/* Show boxes on small/medium screens */}
        <div className={cn("flex flex-wrap gap-10 lg:hidden")}>
          {features.map((feature) => (
            <Box feature={feature} key={feature.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
