"use client";

import { useEffect, useRef, useState } from "react";
import { useFullscreen } from "../model/useFullscreen";
import { CallHeader } from "./CallHeader";
import { CallVideoArea } from "./CallVideoArea";
import { CallControls } from "./CallControls";
// import { CallChatPanel } from "./CallChatPanel";
import { useCall } from "../model/callContext";
import { cn } from "@/shared";

interface EmbeddedCallScreenProps {
  onToggleChat?: () => void;
  showChat?: boolean;
}

export function EmbeddedCallScreen({
  onToggleChat,
  showChat = false,
}: EmbeddedCallScreenProps) {
  const { callState, endCall, toggleScreenShare } = useCall();

  // const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [controlsHidden, setControlsHidden] = useState(false);
  const [internalShowChat, setInternalShowChat] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showControls = true;

  const { ref, isFullscreen, handleFullscreen } =
    useFullscreen<HTMLDivElement | null>();

  const isChatVisible = onToggleChat ? showChat : internalShowChat;
  const handleToggleChat =
    onToggleChat || (() => setInternalShowChat(!internalShowChat));

  // // Update remote video stream
  // useEffect(() => {
  //   if (remoteVideoRef.current && callState.remoteStream) {
  //     remoteVideoRef.current.srcObject = callState.remoteStream;
  //   }
  // }, [callState.remoteStream]);

  // Duration timer
  useEffect(() => {
    if (callState.status !== "connected" || !callState.startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - callState.startTime!.getTime()) / 1000
      );
      setDuration(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [callState.status, callState.startTime]);

  // Auto-hide controls (only in fullscreen)
  useEffect(() => {
    // Reset hidden state when exiting fullscreen
    if (!isFullscreen) {
      // Use a microtask to avoid synchronous setState warning
      queueMicrotask(() => setControlsHidden(false));
      return;
    }

    const handleMouseMove = () => {
      setControlsHidden(false);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      controlsTimeoutRef.current = setTimeout(() => {
        if (callState.status === "connected" && isFullscreen) {
          setControlsHidden(true);
        }
      }, 3000);
    };

    // Trigger initial show
    handleMouseMove();

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [callState.status, isFullscreen]);

  // if (callState.status !== "connected" && callState.status !== "connecting") {
  //   return null;
  // }

  const isVideoCall = callState.type === "video";
  const participantName =
    callState.caller?.name || callState.recipient?.name || "Unknown";

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col bg-error h-full w-full z-20",
        isFullscreen ? "fixed inset-0 z-50" : "flex-1"
      )}
    >
      <CallHeader
        participantName={participantName}
        duration={duration}
        isVideoCall={isVideoCall}
        isFullscreen={isFullscreen}
        onToggleChat={handleToggleChat}
        onFullscreen={handleFullscreen}
        showChat={isChatVisible}
        callStatus={callState.status}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col bg-background relative">
          <CallVideoArea isVideoCall={isVideoCall} />

          <CallControls
            callState={callState}
            showControls={showControls}
            onScreenShare={toggleScreenShare}
            onEnd={endCall}
          />
        </div>
        {/* {isChatVisible && (
          <CallChatPanel
            participantName={participantName}
            onClose={handleToggleChat}
          />
        )} */}
      </div>
    </div>
  );
}
