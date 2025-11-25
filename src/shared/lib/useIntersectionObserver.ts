"use client";
import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasIntersected) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        setHasIntersected(true);
      }
    }, options);
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [options, hasIntersected]);
  return { ref, isIntersecting, hasIntersected };
}
