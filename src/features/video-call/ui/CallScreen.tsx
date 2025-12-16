"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Monitor,
  MonitorOff,
  Maximize2,
  Minimize2,
  Clock,
} from "lucide-react";
import { useCall } from "../model/callContext";

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export function CallScreen() {
  const { callState, endCall, toggleMute, toggleCamera, toggleScreenShare } =
    useCall();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update local video stream
  useEffect(() => {
    if (localVideoRef.current && callState.localStream) {
      localVideoRef.current.srcObject = callState.localStream;
    }
  }, [callState.localStream]);

  // Update remote video stream
  useEffect(() => {
    if (remoteVideoRef.current && callState.remoteStream) {
      remoteVideoRef.current.srcObject = callState.remoteStream;
    }
  }, [callState.remoteStream]);

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

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      controlsTimeoutRef.current = setTimeout(() => {
        if (callState.status === "connected") {
          setShowControls(false);
        }
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [callState.status]);

  // Toggle fullscreen
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (callState.status !== "connected" && callState.status !== "connecting") {
    return null;
  }

  const isVideoCall = callState.type === "video";
  const participantName =
    callState.caller?.name || callState.recipient?.name || "Unknown";

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
      {/* Header */}
      <div
        className={`
          absolute top-0 left-0 right-0 z-10 p-4
          bg-gradient-to-b from-black/80 to-transparent
          transition-opacity duration-300
          ${showControls ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-medium">
                {participantName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-white font-medium">{participantName}</h3>
              {callState.status === "connected" && (
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{formatDuration(duration)}</span>
                </div>
              )}
              {callState.status === "connecting" && (
                <p className="text-sm text-gray-400">Connecting...</p>
              )}
            </div>
          </div>

          <button
            onClick={handleFullscreen}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5 text-white" />
            ) : (
              <Maximize2 className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 flex items-center justify-center p-4">
        {isVideoCall ? (
          <div className="relative w-full h-full max-w-6xl">
            {/* Remote Video (Main) */}
            <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-900">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {(!callState.remoteStream ||
                callState.remoteStream.getVideoTracks().length === 0) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-5xl text-white font-semibold">
                      {participantName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Local Video (PIP) */}
            <div className="absolute bottom-4 right-4 w-40 h-28 rounded-xl overflow-hidden bg-gray-800 shadow-2xl border-2 border-gray-700">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
              {callState.isLocalCameraOff && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <VideoOff className="w-8 h-8 text-gray-500" />
                </div>
              )}
            </div>

            {/* Screen share indicator */}
            {callState.isScreenSharing && (
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/50">
                <Monitor className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Sharing screen</span>
              </div>
            )}
          </div>
        ) : (
          // Voice call - show avatar only
          <div className="flex flex-col items-center gap-6">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1.5 animate-pulse">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-6xl text-white font-semibold">
                  {participantName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white">
                {participantName}
              </h2>
              {callState.status === "connected" && (
                <p className="text-lg text-gray-400 mt-1">
                  {formatDuration(duration)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 z-10 p-6
          bg-gradient-to-t from-black/80 to-transparent
          transition-opacity duration-300
          ${showControls ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="flex items-center justify-center gap-4">
          {/* Mute */}
          <button
            onClick={toggleMute}
            className={`
              relative group w-14 h-14 rounded-full flex items-center justify-center
              transition-all duration-200 transform hover:scale-105 active:scale-95
              ${
                callState.isLocalMuted
                  ? "bg-red-500/20 border-2 border-red-500"
                  : "bg-white/10 hover:bg-white/20"
              }
            `}
          >
            {callState.isLocalMuted ? (
              <MicOff className="w-6 h-6 text-red-400" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Camera (video calls only) */}
          {isVideoCall && (
            <button
              onClick={toggleCamera}
              className={`
                relative group w-14 h-14 rounded-full flex items-center justify-center
                transition-all duration-200 transform hover:scale-105 active:scale-95
                ${
                  callState.isLocalCameraOff
                    ? "bg-red-500/20 border-2 border-red-500"
                    : "bg-white/10 hover:bg-white/20"
                }
              `}
            >
              {callState.isLocalCameraOff ? (
                <VideoOff className="w-6 h-6 text-red-400" />
              ) : (
                <Video className="w-6 h-6 text-white" />
              )}
            </button>
          )}

          {/* Screen Share (video calls only) */}
          {isVideoCall && (
            <button
              onClick={toggleScreenShare}
              className={`
                relative group w-14 h-14 rounded-full flex items-center justify-center
                transition-all duration-200 transform hover:scale-105 active:scale-95
                ${
                  callState.isScreenSharing
                    ? "bg-green-500/20 border-2 border-green-500"
                    : "bg-white/10 hover:bg-white/20"
                }
              `}
            >
              {callState.isScreenSharing ? (
                <MonitorOff className="w-6 h-6 text-green-400" />
              ) : (
                <Monitor className="w-6 h-6 text-white" />
              )}
            </button>
          )}

          {/* End Call */}
          <button
            onClick={endCall}
            className="relative group w-16 h-14 rounded-full bg-gradient-to-b from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            <PhoneOff className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
