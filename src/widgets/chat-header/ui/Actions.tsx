"use client";

import { VideoCallButton } from "@/features/video-call";
import { cn } from "@/shared/lib";
import { MoreVertical } from "lucide-react";

interface ActionsProps {
  chatId: number;
  recipientId: string;
  recipientName: string;
}

export default function Actions({
  chatId,
  recipientId,
  recipientName,
}: ActionsProps) {
  return (
    <div className="flex gap-2">
      {/* Voice Call */}
      <VideoCallButton
        chatId={chatId}
        recipientId={recipientId}
        recipientName={recipientName}
        callType="audio"
      />
      {/* Video Call */}
      <VideoCallButton
        chatId={chatId}
        recipientId={recipientId}
        recipientName={recipientName}
        callType="video"
      />
      <button
        className={cn(
          "p-2 rounded-lg",
          "hover:bg-surface transition-colors",
          "text-text-muted hover:text-text-primary"
        )}
        aria-label="more"
        title="more"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
    </div>
  );
}
