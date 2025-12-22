import { VideoOff, Monitor, MicOff } from "lucide-react";

import { cn, getAvatarColor } from "@/shared";
import useLocalVideoStream from "../model/useLocalVideoStream";
import useRemoteVideoStream from "../model/useRemoteVideoStream";
import ShareScreen from "./ShareScreen";
import { useCall } from "../model/callContext";

interface CallVideoAreaProps {
  isVideoCall: boolean;
}

export function CallVideoArea({ isVideoCall }: CallVideoAreaProps) {
  const { localVideoRef, isCameraOn, isMuted } = useLocalVideoStream();
  const { remoteVideoRef } = useRemoteVideoStream();
  const { callState } = useCall();
  const participantName = "Participant";

  console.log(callState.isScreenSharing, "screen sharing status");
  return (
    <div className="flex-1 flex flex-col bg-background relative">
      <div className="flex-1 flex items-center justify-center p-2">
        <ShareScreen />
        {isVideoCall ? (
          <div className="relative w-full h-full">
            {/* Remote Video (Main) */}
            <div className="w-full h-full rounded-xl overflow-hidden bg-surface">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {(!callState.remoteStream ||
                callState.remoteStream.getVideoTracks().length === 0) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-full bg-linear-to-br  flex items-center justify-center",
                      getAvatarColor(participantName)
                    )}
                  >
                    <span className="text-3xl text-text-primary font-semibold">
                      {participantName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Local Video (PIP) */}
            <div className="absolute bottom-14 right-2 w-32 h-24 rounded-lg overflow-hidden bg-surface shadow-xl border border-border">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <VideoOff className="w-5 h-5 text-text-muted" />
                </div>
              )}

              {isMuted && (
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-error/20 border border-error/50">
                  <MicOff className="w-3 h-3 text-error" />
                  <span className="text-xs text-error">Muted</span>
                </div>
              )}
            </div>

            {/* Screen share indicator */}
            {callState.isScreenSharing && (
              <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-success/20 border border-success/50">
                <Monitor className="w-3 h-3 text-success" />
                <span className="text-xs text-success">Sharing</span>
              </div>
            )}
          </div>
        ) : (
          // Voice call - show avatar only

          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary to-secondary p-1 animate-pulse">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-3xl text-text-primary font-semibold">
                  {participantName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-text-primary">
                {participantName}
              </h2>
              {callState.status === "connected" && (
                <p className="text-sm text-text-muted">
                  {/* Duration should be passed if needed */}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
