import { useEffect, useRef } from "react";
import { useCall } from "./callContext";

export default function useLocalVideoStream() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const { callState, toggleMute, toggleCamera } = useCall();

  useEffect(() => {
    if (!localVideoRef.current) return;
    localVideoRef.current.srcObject = callState.localStream;
  }, [callState.localStream]);

  return {
    localVideoRef,
    toggleMute,
    toggleCamera,
    isMuted: callState.isLocalMuted,
    isCameraOn: !callState.isLocalCameraOff,
  };
}
