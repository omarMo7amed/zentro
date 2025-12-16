"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useSocket } from "@/shared/lib";
import {
  CallState,
  CallContextType,
  CallType,
  CallStatus,
  initialCallState,
  CallRequestPayload,
  CallAnswerPayload,
  CallDeclinePayload,
  IceCandidatePayload,
} from "../types";
import {
  createPeerConnection,
  getUserMedia,
  getScreenShare,
  stopMediaStream,
  toggleTrack,
  addStreamToPeerConnection,
  createOffer,
  createAnswer,
  setRemoteAnswer,
  addIceCandidate,
  replaceVideoTrack,
} from "../lib/webrtc";
import { callSounds } from "../lib/sounds";

// ============ REDUCER ============

type CallAction =
  | {
      type: "START_OUTGOING_CALL";
      payload: {
        chatId: number;
        callType: CallType;
        recipientId: string;
        recipientName: string;
      };
    }
  | { type: "INCOMING_CALL"; payload: CallRequestPayload }
  | { type: "CALL_ACCEPTED"; payload: { remoteStream: MediaStream } }
  | { type: "CALL_DECLINED"; payload: { reason: string } }
  | { type: "CALL_CONNECTED"; payload: { startTime: Date } }
  | { type: "CALL_ENDED" }
  | { type: "CALL_FAILED"; payload: { error: string } }
  | { type: "SET_LOCAL_STREAM"; payload: { stream: MediaStream } }
  | { type: "SET_REMOTE_STREAM"; payload: { stream: MediaStream } }
  | { type: "TOGGLE_MUTE" }
  | { type: "TOGGLE_CAMERA" }
  | { type: "TOGGLE_SCREEN_SHARE"; payload: { isSharing: boolean } }
  | { type: "RESET" }
  | {
      type: "SET_DEMO_STATE";
      payload: { status: CallStatus; callType: CallType };
    };

function callReducer(state: CallState, action: CallAction): CallState {
  switch (action.type) {
    case "START_OUTGOING_CALL":
      return {
        ...state,
        status: "outgoing",
        type: action.payload.callType,
        chatId: action.payload.chatId,
        recipient: {
          id: action.payload.recipientId,
          name: action.payload.recipientName,
          isMuted: false,
          isCameraOff: false,
          isScreenSharing: false,
        },
      };

    case "INCOMING_CALL":
      return {
        ...state,
        status: "incoming",
        type: action.payload.callType,
        chatId: action.payload.chatId,
        caller: {
          id: action.payload.from,
          name: action.payload.fromName,
          avatar: action.payload.fromAvatar,
          isMuted: false,
          isCameraOff: false,
          isScreenSharing: false,
        },
      };

    case "CALL_ACCEPTED":
      return {
        ...state,
        status: "connecting",
        remoteStream: action.payload.remoteStream,
      };

    case "CALL_CONNECTED":
      return {
        ...state,
        status: "connected",
        startTime: action.payload.startTime,
      };

    case "CALL_DECLINED":
      return {
        ...state,
        status: "declined",
        error: action.payload.reason,
      };

    case "CALL_ENDED":
      return {
        ...state,
        status: "ended",
      };

    case "CALL_FAILED":
      return {
        ...state,
        status: "failed",
        error: action.payload.error,
      };

    case "SET_LOCAL_STREAM":
      return {
        ...state,
        localStream: action.payload.stream,
      };

    case "SET_REMOTE_STREAM":
      return {
        ...state,
        remoteStream: action.payload.stream,
      };

    case "TOGGLE_MUTE":
      return {
        ...state,
        isLocalMuted: !state.isLocalMuted,
      };

    case "TOGGLE_CAMERA":
      return {
        ...state,
        isLocalCameraOff: !state.isLocalCameraOff,
      };

    case "TOGGLE_SCREEN_SHARE":
      return {
        ...state,
        isScreenSharing: action.payload.isSharing,
      };

    case "SET_DEMO_STATE":
      // Demo state for testing UI without real calls
      return {
        ...initialCallState,
        status: action.payload.status,
        type: action.payload.callType,
        chatId: 1,
        caller:
          action.payload.status === "incoming"
            ? {
                id: "demo-caller",
                name: "John Doe",
                avatar: undefined,
                isMuted: false,
                isCameraOff: false,
                isScreenSharing: false,
              }
            : null,
        recipient:
          action.payload.status === "outgoing"
            ? {
                id: "demo-recipient",
                name: "Alice Smith",
                isMuted: false,
                isCameraOff: false,
                isScreenSharing: false,
              }
            : null,
        startTime: action.payload.status === "connected" ? new Date() : null,
      };

    case "RESET":
      return initialCallState;

    default:
      return state;
  }
}

// ============ CONTEXT ============

const CallContext = createContext<CallContextType | null>(null);

export function CallProvider({ children }: { children: ReactNode }) {
  const [callState, dispatch] = useReducer(callReducer, initialCallState);
  const { socket } = useSocket();

  // Refs for WebRTC
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const pendingOfferRef = useRef<RTCSessionDescriptionInit | null>(null);
  const iceCandidatesQueue = useRef<RTCIceCandidateInit[]>([]);

  // ============ CLEANUP ============

  const cleanup = useCallback(() => {
    callSounds.stopAll();
    stopMediaStream(callState.localStream);
    stopMediaStream(callState.remoteStream);

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    pendingOfferRef.current = null;
    iceCandidatesQueue.current = [];
    dispatch({ type: "RESET" });
  }, [callState.localStream, callState.remoteStream]);

  // ============ START CALL ============

  const startCall = useCallback(
    async (
      chatId: number,
      type: CallType,
      recipientId: string,
      recipientName: string
    ) => {
      if (!socket) return;

      try {
        // Get local media
        const localStream = await getUserMedia(type === "video", true);
        dispatch({
          type: "SET_LOCAL_STREAM",
          payload: { stream: localStream },
        });

        // Create peer connection
        const pc = createPeerConnection();
        peerConnectionRef.current = pc;

        // Add local stream to peer connection
        addStreamToPeerConnection(pc, localStream);

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
          if (event.candidate && socket) {
            socket.emit("ice-candidate", {
              to: recipientId,
              candidate: event.candidate.toJSON(),
            });
          }
        };

        // Handle remote stream
        pc.ontrack = (event) => {
          dispatch({
            type: "SET_REMOTE_STREAM",
            payload: { stream: event.streams[0] },
          });
        };

        // Handle connection state
        pc.onconnectionstatechange = () => {
          if (pc.connectionState === "connected") {
            callSounds.playConnectSound();
            dispatch({
              type: "CALL_CONNECTED",
              payload: { startTime: new Date() },
            });
          } else if (pc.connectionState === "failed") {
            dispatch({
              type: "CALL_FAILED",
              payload: { error: "Connection failed" },
            });
            cleanup();
          }
        };

        // Create and send offer
        const offer = await createOffer(pc);

        dispatch({
          type: "START_OUTGOING_CALL",
          payload: { chatId, callType: type, recipientId, recipientName },
        });

        socket.emit("call-request", {
          to: recipientId,
          chatId,
          callType: type,
          offer,
        });

        // Play outgoing tone
        callSounds.playOutgoingTone();
      } catch (error) {
        console.error("Error starting call:", error);
        dispatch({
          type: "CALL_FAILED",
          payload: { error: "Failed to access media devices" },
        });
        cleanup();
      }
    },
    [socket, cleanup]
  );

  // ============ ACCEPT CALL ============

  const acceptCall = useCallback(async () => {
    if (!socket || !pendingOfferRef.current) return;

    try {
      callSounds.stopAll();

      // Get local media
      const localStream = await getUserMedia(callState.type === "video", true);
      dispatch({ type: "SET_LOCAL_STREAM", payload: { stream: localStream } });

      // Create peer connection
      const pc = createPeerConnection();
      peerConnectionRef.current = pc;

      // Add local stream
      addStreamToPeerConnection(pc, localStream);

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate && socket && callState.caller) {
          socket.emit("ice-candidate", {
            to: callState.caller.id,
            candidate: event.candidate.toJSON(),
          });
        }
      };

      // Handle remote stream
      pc.ontrack = (event) => {
        dispatch({
          type: "SET_REMOTE_STREAM",
          payload: { stream: event.streams[0] },
        });
      };

      // Handle connection state
      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") {
          callSounds.playConnectSound();
          dispatch({
            type: "CALL_CONNECTED",
            payload: { startTime: new Date() },
          });
        } else if (pc.connectionState === "failed") {
          dispatch({
            type: "CALL_FAILED",
            payload: { error: "Connection failed" },
          });
          cleanup();
        }
      };

      // Create and send answer
      const answer = await createAnswer(pc, pendingOfferRef.current);

      socket.emit("call-accept", {
        to: callState.caller?.id,
        answer,
      });

      // Process queued ICE candidates
      for (const candidate of iceCandidatesQueue.current) {
        await addIceCandidate(pc, candidate);
      }
      iceCandidatesQueue.current = [];

      dispatch({
        type: "CALL_ACCEPTED",
        payload: { remoteStream: new MediaStream() },
      });
    } catch (error) {
      console.error("Error accepting call:", error);
      dispatch({
        type: "CALL_FAILED",
        payload: { error: "Failed to accept call" },
      });
      cleanup();
    }
  }, [socket, callState.type, callState.caller, cleanup]);

  // ============ DECLINE CALL ============

  const declineCall = useCallback(
    (reason = "declined") => {
      if (!socket) return;

      callSounds.stopAll();

      const targetId = callState.caller?.id || callState.recipient?.id;
      if (targetId) {
        socket.emit("call-decline", { to: targetId, reason });
      }

      dispatch({ type: "CALL_DECLINED", payload: { reason } });
      setTimeout(cleanup, 2000);
    },
    [socket, callState.caller, callState.recipient, cleanup]
  );

  // ============ END CALL ============

  const endCall = useCallback(() => {
    if (!socket) return;

    callSounds.playEndCallSound();

    const targetId = callState.caller?.id || callState.recipient?.id;
    if (targetId) {
      socket.emit("call-end", { to: targetId, reason: "ended" });
    }

    dispatch({ type: "CALL_ENDED" });
    setTimeout(cleanup, 1000);
  }, [socket, callState.caller, callState.recipient, cleanup]);

  // ============ TOGGLE MUTE ============

  const toggleMute = useCallback(() => {
    toggleTrack(callState.localStream, "audio", callState.isLocalMuted);
    dispatch({ type: "TOGGLE_MUTE" });
  }, [callState.localStream, callState.isLocalMuted]);

  // ============ TOGGLE CAMERA ============

  const toggleCamera = useCallback(() => {
    toggleTrack(callState.localStream, "video", callState.isLocalCameraOff);
    dispatch({ type: "TOGGLE_CAMERA" });
  }, [callState.localStream, callState.isLocalCameraOff]);

  // ============ TOGGLE SCREEN SHARE ============

  const toggleScreenShare = useCallback(async () => {
    if (!peerConnectionRef.current) return;

    try {
      if (callState.isScreenSharing) {
        // Stop screen share, go back to camera
        const cameraStream = await getUserMedia(true, false);
        await replaceVideoTrack(peerConnectionRef.current, cameraStream);
        dispatch({
          type: "TOGGLE_SCREEN_SHARE",
          payload: { isSharing: false },
        });
      } else {
        // Start screen share
        const screenStream = await getScreenShare();
        await replaceVideoTrack(peerConnectionRef.current, screenStream);

        // When user stops sharing via browser UI
        screenStream.getVideoTracks()[0].onended = async () => {
          const cameraStream = await getUserMedia(true, false);
          if (peerConnectionRef.current) {
            await replaceVideoTrack(peerConnectionRef.current, cameraStream);
          }
          dispatch({
            type: "TOGGLE_SCREEN_SHARE",
            payload: { isSharing: false },
          });
        };

        dispatch({ type: "TOGGLE_SCREEN_SHARE", payload: { isSharing: true } });
      }
    } catch (error) {
      console.error("Error toggling screen share:", error);
    }
  }, [callState.isScreenSharing]);

  // ============ SOCKET EVENT LISTENERS ============

  useEffect(() => {
    if (!socket) return;

    // Incoming call
    socket.on("call-request", (data: CallRequestPayload) => {
      pendingOfferRef.current = data.offer;
      dispatch({ type: "INCOMING_CALL", payload: data });
      callSounds.playRingtone();
    });

    // Call accepted
    socket.on("call-accept", async (data: CallAnswerPayload) => {
      callSounds.stopAll();
      if (peerConnectionRef.current) {
        await setRemoteAnswer(peerConnectionRef.current, data.answer);
      }
    });

    // Call declined
    socket.on("call-decline", (data: CallDeclinePayload) => {
      callSounds.stopAll();
      dispatch({ type: "CALL_DECLINED", payload: { reason: data.reason } });
      setTimeout(cleanup, 2000);
    });

    // Call ended
    socket.on("call-end", () => {
      callSounds.playEndCallSound();
      dispatch({ type: "CALL_ENDED" });
      setTimeout(cleanup, 1000);
    });

    // ICE candidate
    socket.on("ice-candidate", async (data: IceCandidatePayload) => {
      if (peerConnectionRef.current) {
        await addIceCandidate(peerConnectionRef.current, data.candidate);
      } else {
        // Queue if peer connection not ready
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
  }, [socket, cleanup]);

  // ============ DEMO STATE (for testing UI) ============

  const setDemoState = useCallback(
    (status: CallStatus, callType: CallType = "video") => {
      if (status === "idle") {
        dispatch({ type: "RESET" });
      } else {
        dispatch({ type: "SET_DEMO_STATE", payload: { status, callType } });
      }
    },
    []
  );

  // ============ RENDER ============

  return (
    <CallContext.Provider
      value={{
        callState,
        startCall,
        acceptCall,
        declineCall,
        endCall,
        toggleMute,
        toggleCamera,
        toggleScreenShare,
        setDemoState,
      }}
    >
      {children}
    </CallContext.Provider>
  );
}

// ============ HOOK ============

export function useCall(): CallContextType {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
}
