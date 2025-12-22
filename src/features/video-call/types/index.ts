// ============ CALL TYPES ============

export type CallType = "video" | "audio";

export interface VideoCallButtonProps {
  chatId: number;
  recipientId: string;
  recipientName: string;
  variant?: "icon" | "full";
  callType?: CallType;
}

export type CallStatus =
  | "idle"
  | "outgoing"
  | "incoming"
  | "connecting"
  | "connected"
  | "ended"
  | "declined"
  | "missed"
  | "failed";

export type CallAction =
  | {
      type: "START_OUTGOING_CALL";
      payload: {
        chatId: number;
        callType: CallType;
        recipientId: string;
        recipientName: string;
      };
    }
  | { type: "START_SCREEN_SHARE"; payload: { stream: MediaStream } }
  | { type: "STOP_SCREEN_SHARE" }
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
  | { type: "RESET" }
  | {
      type: "SET_DEMO_STATE";
      payload: { status: CallStatus; callType: CallType };
    };

export interface CallParticipant {
  id: string;
  name: string;
  avatar?: string;
  isMuted: boolean;
  isCameraOff: boolean;
  isScreenSharing: boolean;
  stream?: MediaStream;
}

export interface CallState {
  status: CallStatus;
  type: CallType | null;
  chatId: number | null;
  caller: CallParticipant | null; // Person who initiated
  recipient: CallParticipant | null; // Person being called
  participants: CallParticipant[]; // All in call (for group calls)
  startTime: Date | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  screenStream: MediaStream | null;
  isLocalMuted: boolean;
  isLocalCameraOff: boolean;
  isScreenSharing: boolean;
  error: string | null;
}

// ============ SOCKET EVENT TYPES ============

export interface CallRequestPayload {
  from: string;
  fromName: string;
  fromAvatar?: string;
  chatId: number;
  callType: CallType;
  offer: RTCSessionDescriptionInit;
}

export interface CallAnswerPayload {
  from: string;
  answer: RTCSessionDescriptionInit;
}

export interface CallDeclinePayload {
  from: string;
  reason: "declined" | "busy" | "timeout";
}

export interface IceCandidatePayload {
  from: string;
  candidate: RTCIceCandidateInit;
}

export interface CallEndPayload {
  from: string;
  reason: "ended" | "failed" | "timeout";
}

// ============ CONTEXT TYPES ============

export interface CallContextType {
  callState: CallState;
  startCall: (
    // chatId: number,
    type: CallType
    // recipientId: string,
    // recipientName: string
  ) => Promise<void>;
  acceptCall: () => Promise<void>;
  declineCall: (reason?: string) => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleCamera: () => void;
  toggleScreenShare: () => Promise<void>;
  /** For demo/testing: set call state directly */
  setDemoState: (status: CallStatus, type?: CallType) => void;
}

// ============ INITIAL STATE ============

export const initialCallState: CallState = {
  status: "idle",
  type: null,
  chatId: null,
  caller: null,
  recipient: null,
  participants: [],
  startTime: null,
  localStream: null,
  remoteStream: null,
  screenStream: null,
  isLocalMuted: false,
  isLocalCameraOff: false,
  isScreenSharing: false,
  error: null,
};
