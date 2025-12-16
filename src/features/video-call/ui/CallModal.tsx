"use client";
import { cn, getAvatarColor } from "@/shared";
import Image from "next/image";
import { useCall } from "../model/callContext";
import { Phone, PhoneOff, Video } from "lucide-react";
import { useEffect, useState } from "react";

export default function CallModal({ type }: { type: "incoming" | "outgoing" }) {
  const { callState, acceptCall, declineCall, endCall } = useCall();
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (type !== "outgoing") return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, [type]);

  if (type === "incoming" && callState.status !== "incoming") return null;
  if (type === "outgoing" && callState.status !== "outgoing") return null;

  const isVideoCall = callState.type === "video";

  const person = type === "incoming" ? callState.caller : callState.recipient;
  const personName = person?.name || "Unknown";
  const personAvatar = person?.avatar;
  const personId = person?.id || "";

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-in-down">
      <div className="bg-surface flex items-center gap-4 p-3 rounded-xl border-primary/30 shadow-2xl">
        <div className="relative">
          <div
            className={cn(
              "absolute inset-0 rounded-full animate-ping",
              type === "incoming" ? "bg-primary/30" : "bg-secondary/30"
            )}
          />
          <div
            className={cn(
              "relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden",
              getAvatarColor(personId)
            )}
          >
            {personAvatar ? (
              <Image
                src={personAvatar}
                alt={personName}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold">
                {personName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Call info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {isVideoCall ? (
              <Video
                className={cn(
                  "w-4 h-4",
                  type === "incoming" ? "text-primary" : "text-secondary"
                )}
              />
            ) : (
              <Phone
                className={cn(
                  "w-4 h-4",
                  type === "incoming" ? "text-primary" : "text-secondary"
                )}
              />
            )}
            <span className="text-text-primary font-medium">{personName}</span>
          </div>
          <span className="text-sm text-text-muted">
            {type === "incoming"
              ? `Incoming ${isVideoCall ? "video" : "voice"} call...`
              : `Calling${dots}`}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-2">
          {/* Decline/Cancel button */}
          <button
            onClick={() =>
              type === "incoming" ? declineCall("declined") : endCall()
            }
            className="w-10 h-10 rounded-full bg-linear-to-b from-error to-error/80 flex items-center justify-center shadow-lg hover:shadow-error/40 transition-all transform hover:scale-105 active:scale-95"
          >
            <PhoneOff className="w-5 h-5 text-text-primary" />
          </button>

          {/* Accept button - only for incoming calls */}
          {type === "incoming" && (
            <button
              onClick={acceptCall}
              className="w-10 h-10 rounded-full bg-linear-to-b from-success to-success/80 flex items-center justify-center shadow-lg hover:shadow-success/40 transition-all transform hover:scale-105 active:scale-95 animate-pulse"
            >
              {isVideoCall ? (
                <Video className="w-5 h-5 text-text-primary" />
              ) : (
                <Phone className="w-5 h-5 text-text-primary" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
