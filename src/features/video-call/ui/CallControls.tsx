import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  PhoneOff,
} from "lucide-react";
import { cn } from "@/shared";
import { CallState } from "../types";

import { useCall } from "../model/callContext";

interface CallControlsProps {
  showControls: boolean;
  callState: CallState;
  onScreenShare: () => void;
  onEnd: () => void;
}

export function CallControls({
  showControls,
  callState,
  onScreenShare,
  onEnd,
}: CallControlsProps) {
  const isVideoCall = callState.type === "video";
  // const { setOpenInCall, setIsMuted } = useLocalVideoStream();
  const { toggleMute, toggleCamera, toggleScreenShare } = useCall();

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-10 p-4",
        "bg-linear-to-t from-background/90 to-transparent",
        "transition-opacity duration-300",
        showControls ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex items-center justify-center gap-3">
        {/* Mute */}
        <button
          onClick={toggleMute}
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center",
            "transition-all duration-200 transform hover:scale-105 active:scale-95",
            callState.isLocalMuted
              ? "bg-error/20 border-2 border-error"
              : "bg-surface hover:bg-surface-hover"
          )}
        >
          {callState.isLocalMuted ? (
            <MicOff className="w-5 h-5 text-error" />
          ) : (
            <Mic className="w-5 h-5 text-text-primary" />
          )}
        </button>

        {/* Camera (video calls only) */}
        {isVideoCall && (
          <button
            onClick={toggleCamera}
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center",
              "transition-all duration-200 transform hover:scale-105 active:scale-95",
              callState.isLocalCameraOff
                ? "bg-error/20 border-2 border-error"
                : "bg-surface hover:bg-surface-hover"
            )}
          >
            {callState.isLocalCameraOff ? (
              <VideoOff className="w-5 h-5 text-error" />
            ) : (
              <Video className="w-5 h-5 text-text-primary" />
            )}
          </button>
        )}

        {/* Screen Share (video calls only) */}
        {isVideoCall && (
          <button
            onClick={toggleScreenShare}
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center",
              "transition-all duration-200 transform hover:scale-105 active:scale-95",
              callState.isScreenSharing
                ? "bg-success/20 border-2 border-success"
                : "bg-surface hover:bg-surface-hover"
            )}
          >
            {callState.isScreenSharing ? (
              <MonitorOff className="w-5 h-5 text-success" />
            ) : (
              <Monitor className="w-5 h-5 text-text-primary" />
            )}
          </button>
        )}

        {/* End Call */}
        <button
          onClick={onEnd}
          className="w-12 h-11 rounded-full bg-linear-to-b from-error to-error/80 flex items-center justify-center shadow-lg shadow-error/30 hover:shadow-error/50 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <PhoneOff className="w-5 h-5 text-text-primary" />
        </button>
      </div>
    </div>
  );
}
