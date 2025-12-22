import { useRef } from "react";

export function usePeerConnection() {
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const pendingOfferRef = useRef<RTCSessionDescriptionInit | null>(null);
  const iceCandidatesQueue = useRef<RTCIceCandidateInit[]>([]);

  return {
    peerConnectionRef,
    pendingOfferRef,
    iceCandidatesQueue,
  };
}
