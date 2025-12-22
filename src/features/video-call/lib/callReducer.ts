import { CallAction, CallState, initialCallState } from "../types";

export function callReducer(state: CallState, action: CallAction): CallState {
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
        isScreenSharing: false,
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

    case "START_SCREEN_SHARE":
      return {
        ...state,
        isScreenSharing: true,
        screenStream: action.payload.stream,
      };

    case "STOP_SCREEN_SHARE":
      state.screenStream?.getTracks().forEach((track) => track.stop());
      return {
        ...state,
        isScreenSharing: false,
        screenStream: null,
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
