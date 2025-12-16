"use client";

import { Phone, Video } from "lucide-react";
import { useCall } from "../model/callContext";
import { cn } from "@/shared";
import { VideoCallButtonProps } from "../types";

export default function VideoCallButton({
  chatId,
  recipientId,
  recipientName,
  variant = "icon",
  callType = "video",
}: VideoCallButtonProps) {
  const { startCall, callState } = useCall();

  const isInCall = callState.status !== "idle";

  const handleClick = () => {
    if (isInCall) return;
    startCall(chatId, callType, recipientId, recipientName);
  };

  const Icon = callType === "video" ? Video : Phone;

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        disabled={isInCall}
        className={cn(
          "p-2 rounded-lg transition-all duration-200",
          isInCall
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "hover:bg-surface text-text-muted hover:text-text-primary"
        )}
        title={callType === "video" ? "Start video call" : "Start voice call"}
        aria-label={callType === "video" ? "video-call" : "voice-call"}
      >
        <Icon className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isInCall}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
        isInCall
          ? "bg-gray-700 text-gray-500 cursor-not-allowed"
          : "bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{callType === "video" ? "Video Call" : "Voice Call"}</span>
    </button>
  );
}
