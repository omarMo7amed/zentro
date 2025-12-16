import { useEffect, useRef, useState } from "react";

export function useAutoHideControls(
  isFullscreen: boolean,
  isConnected: boolean
) {
  const [controlsHidden, setControlsHidden] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isFullscreen) {
      queueMicrotask(() => setControlsHidden(false));
      return;
    }
    const handleMouseMove = () => {
      setControlsHidden(false);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isConnected && isFullscreen) {
          setControlsHidden(true);
        }
      }, 3000);
    };
    handleMouseMove();
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isFullscreen, isConnected]);

  return controlsHidden;
}
