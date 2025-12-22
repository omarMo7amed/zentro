import { useCallback } from "react";
import { useSocket } from "@/shared/lib";
import {
  // createPeerConnection,
  getUserMedia,
  // addStreamToPeerConnection,
  // createOffer,
} from "../lib/webrtc";
// import { callSounds } from "../lib/sounds";
import { CallType } from "../types";

import type { Dispatch } from "react";
import type { CallAction, CallState, CallContextType } from "../types";
import type { MutableRefObject } from "react";

interface UseCallActionsParams {
  callState: CallState;
  dispatch: Dispatch<CallAction>;
  peerConnectionRef: MutableRefObject<RTCPeerConnection | null>;
  pendingOfferRef: MutableRefObject<RTCSessionDescriptionInit | null>;
  iceCandidatesQueue: MutableRefObject<RTCIceCandidateInit[]>;
  cleanup: () => void;
}

export function useCallActions({
  callState,
  dispatch,
  peerConnectionRef,
  pendingOfferRef,
  iceCandidatesQueue,
  cleanup,
}: UseCallActionsParams): Pick<
  CallContextType,
  | "startCall"
  | "toggleCamera"
  | "toggleMute"
  | "toggleScreenShare"
  | "acceptCall"
  | "declineCall"
  | "endCall"
> {
  const { socket } = useSocket();

  const startCall = useCallback(
    async (
      // chatId: number,
      type: CallType
      // recipientId: string,
      // recipientName: string
    ) => {
      if (!socket) return;
      try {
        const localStream = await getUserMedia(type === "video", true);
        dispatch({
          type: "SET_LOCAL_STREAM",
          payload: { stream: localStream },
        });
        // const pc = createPeerConnection();
        // peerConnectionRef.current = pc;
        // addStreamToPeerConnection(pc, localStream);
        // pc.onicecandidate = (event) => {
        //   if (event.candidate && socket) {
        //     socket.emit("ice-candidate", {
        //       to: recipientId,
        //       candidate: event.candidate.toJSON(),
        //     });
        //   }
        // };
        // pc.ontrack = (event) => {
        //   dispatch({
        //     type: "SET_REMOTE_STREAM",
        //     payload: { stream: event.streams[0] },
        //   });
        // };
        // pc.onconnectionstatechange = () => {
        //   if (pc.connectionState === "connected") {
        //     callSounds.playConnectSound();
        //     dispatch({
        //       type: "CALL_CONNECTED",
        //       payload: { startTime: new Date() },
        //     });
        //   } else if (pc.connectionState === "failed") {
        //     dispatch({
        //       type: "CALL_FAILED",
        //       payload: { error: "Connection failed" },
        //     });
        //     cleanup();
        //   }
        // };
        // const offer = await createOffer(pc);
        // dispatch({
        //   type: "START_OUTGOING_CALL",
        //   payload: { chatId, callType: type, recipientId, recipientName },
        // });
        // socket.emit("call-request", {
        //   to: recipientId,
        //   chatId,
        //   callType: type,
        //   offer,
        // });
        // callSounds.playOutgoingTone();
      } catch (error) {
        console.error("Error starting call:", error);
        dispatch({
          type: "CALL_FAILED",
          payload: { error: "Failed to access media devices" },
        });
        cleanup();
      }
    },
    [socket, dispatch, cleanup]
  );

  const toggleCamera = useCallback(() => {
    if (callState.localStream) {
      const videoTrack = callState.localStream
        .getVideoTracks()
        .find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        dispatch({ type: "TOGGLE_CAMERA" });
      }
    }
  }, [callState.localStream, dispatch]);

  const toggleMute = useCallback(() => {
    if (callState.localStream) {
      const audioTrack = callState.localStream
        .getAudioTracks()
        .find((track) => track.kind === "audio");
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        dispatch({ type: "TOGGLE_MUTE" });
      }
    }
  }, [callState.localStream, dispatch]);

  const toggleScreenShare = useCallback(async () => {
    // const pc = peerConnectionRef.current;
    // if (!pc) return;

    try {
      // Find the video sender
      // const sender = pc
      //   .getSenders()
      //   .find((s) => s.track && s.track.kind === "video");

      // if (!sender) return;

      // START sharing
      if (!callState.isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });

        const screenTrack = screenStream.getVideoTracks()[0];

        // await sender.replaceTrack(screenTrack);

        dispatch({
          type: "START_SCREEN_SHARE",
          payload: { stream: screenStream },
        });

        console.log("Screen sharing started", screenTrack);
        // When user clicks "Stop sharing" from browser UI
        screenTrack.onended = async () => {
          dispatch({ type: "STOP_SCREEN_SHARE" });
        };
      }

      // STOP sharing manually
      else {
        dispatch({ type: "STOP_SCREEN_SHARE" });
      }
    } catch (err) {
      // console.error("Screen share failed", err);
    }
  }, [
    callState.isScreenSharing,
    // peerConnectionRef,
    dispatch,
  ]);

  const endCall = useCallback(() => {
    dispatch({ type: "CALL_ENDED" });
  }, [dispatch]);

  const acceptCall = useCallback(
    async () => {
      // Implementation for accepting the call
    },
    [
      /* dependencies */
    ]
  );
  const declineCall = useCallback(
    (reason: string = "declined") => {
      // Implementation for declining the call
    },
    [
      /* dependencies */
    ]
  );

  return {
    startCall,
    acceptCall,
    declineCall,
    endCall,
    toggleMute,
    toggleCamera,
    toggleScreenShare,
  };
}
