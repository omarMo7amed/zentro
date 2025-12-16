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
  | "idle" // No active call
  | "outgoing" // Calling someone, waiting for answer
  | "incoming" // Someone is calling us
  | "connecting" // Call accepted, establishing WebRTC
  | "connected" // Call is active
  | "ended" // Call has ended
  | "declined" // Call was declined
  | "missed" // Call wasn't answered
  | "failed"; // Connection failed

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
    chatId: number,
    type: CallType,
    recipientId: string,
    recipientName: string
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
  isLocalMuted: false,
  isLocalCameraOff: false,
  isScreenSharing: false,
  error: null,
};
