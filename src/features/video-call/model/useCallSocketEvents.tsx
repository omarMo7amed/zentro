import { useEffect } from "react";
import { useSocket } from "@/shared/lib";
import {
  CallRequestPayload,
  CallAnswerPayload,
  CallDeclinePayload,
  IceCandidatePayload,
} from "../types";

import type { Dispatch } from "react";
import type { CallAction } from "../types";
import type { MutableRefObject } from "react";

interface UseCallSocketEventsParams {
  dispatch: Dispatch<CallAction>;
  peerConnectionRef: MutableRefObject<RTCPeerConnection | null>;
  pendingOfferRef: MutableRefObject<RTCSessionDescriptionInit | null>;
  iceCandidatesQueue: MutableRefObject<RTCIceCandidateInit[]>;
  cleanup: () => void;
}

export function useCallSocketEvents({
  dispatch,
  peerConnectionRef,
  pendingOfferRef,
  iceCandidatesQueue,
  cleanup,
}: UseCallSocketEventsParams): void {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("call-request", (data: CallRequestPayload) => {
      pendingOfferRef.current = data.offer;
      dispatch({ type: "INCOMING_CALL", payload: data });
      // callSounds.playRingtone();
    });
    socket.on("call-accept", async (data: CallAnswerPayload) => {
      // callSounds.stopAll();
      if (peerConnectionRef.current) {
        // await setRemoteAnswer(peerConnectionRef.current, data.answer);
      }
    });
    socket.on("call-decline", (data: CallDeclinePayload) => {
      // callSounds.stopAll();
      dispatch({ type: "CALL_DECLINED", payload: { reason: data.reason } });
      setTimeout(cleanup, 2000);
    });
    socket.on("call-end", () => {
      // callSounds.playEndCallSound();
      dispatch({ type: "CALL_ENDED" });
      setTimeout(cleanup, 1000);
    });
    socket.on("ice-candidate", async (data: IceCandidatePayload) => {
      if (peerConnectionRef.current) {
        // await addIceCandidate(peerConnectionRef.current, data.candidate);
      } else {
        iceCandidatesQueue.current.push(data.candidate);
      }
    });
    return () => {
      socket.off("call-request");
      socket.off("call-accept");
      socket.off("call-decline");
      socket.off("call-end");
      socket.off("ice-candidate");
    };
  }, [
    socket,
    dispatch,
    peerConnectionRef,
    pendingOfferRef,
    iceCandidatesQueue,
    cleanup,
  ]);
}
