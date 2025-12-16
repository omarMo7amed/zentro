"use client";

import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  fn: () => void
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        fn();
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [fn]);

  return ref;
}
