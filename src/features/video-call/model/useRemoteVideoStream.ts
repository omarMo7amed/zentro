import { useEffect, useRef } from "react";
import { useCall } from "./callContext";

export default function useRemoteVideoStream() {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { callState } = useCall();
  useEffect(() => {
    if (!remoteVideoRef.current) return;
    remoteVideoRef.current.srcObject = callState.remoteStream;
  }, [callState.remoteStream]);
  return {
    remoteVideoRef,
  };
}
