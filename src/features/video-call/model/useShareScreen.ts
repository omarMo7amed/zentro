import { useEffect, useRef } from "react";
import { useCall } from "./callContext";

export default function useScreenShare() {
  const { callState } = useCall();
  const ScreenShareVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    try {
      if (callState.screenStream && ScreenShareVideoRef.current) {
        ScreenShareVideoRef.current.srcObject = callState.screenStream;
      }
    } catch (err) {
      // console.error("Error setting screen share stream:", err);
    }
  }, [callState.screenStream]);
  return {
    ScreenShareVideoRef,
    isScreenSharing: callState.isScreenSharing,
  };
}
