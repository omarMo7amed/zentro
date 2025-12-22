import { useCallback } from "react";
import { callSounds } from "../lib/sounds";
import { stopMediaStream } from "../lib/webrtc";

export function useCallCleanup({
  callState,
  peerConnectionRef,
  pendingOfferRef,
  iceCandidatesQueue,
  dispatch,
}) {
  return useCallback(() => {
    callSounds.stopAll();
    stopMediaStream(callState.localStream);
    stopMediaStream(callState.remoteStream);
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    pendingOfferRef.current = null;
    iceCandidatesQueue.current.length = 0;
    dispatch({ type: "RESET" });
  }, [
    callState.localStream,
    callState.remoteStream,
    peerConnectionRef,
    pendingOfferRef,
    iceCandidatesQueue,
    dispatch,
  ]);
}
