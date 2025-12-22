import { useCallback, useEffect, useRef, useState } from "react";

export function useFullscreen<T extends HTMLElement | null>() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ref = useRef<T | null>(null);

  const handleFullscreen = useCallback(async () => {
    if (!ref.current) return;
    try {
      if (!document.fullscreenElement) {
        await ref.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return { ref, isFullscreen, setIsFullscreen, handleFullscreen };
}
