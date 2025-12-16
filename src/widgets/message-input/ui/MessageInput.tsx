"use client";

import { useSendMessage } from "@/features/send-message";
import AttachFileButton from "./AttachFileButton";
import { MessageInputProps } from "../types";
import ChannelButton from "./ChannelButton";
import MentionButton from "./MentionButton";
import EmojiButton from "./EmojiButton";
import { Send } from "lucide-react";
import { cn } from "@/shared/lib";

export default function MessageInput({
  chatId,
  onMessageSent,
  onFilesSelected,
}: MessageInputProps) {
  const { message, setMessage, sendMessage, isLoading } = useSendMessage({
    chatId: Number(chatId),
  });

  const handleSend = () => {
    if (!message.trim()) return;

    onMessageSent?.(message.trim());

    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border bg-background-elevated">
      <div
        className={cn(
          "bg-surface rounded-lg border border-border",
          "focus-within:border-primary transition-colors"
        )}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isLoading}
          aria-label="Message input"
          className={cn(
            "w-full px-4 py-3 bg-transparent",
            "text-sm text-text-primary placeholder:text-text-muted",
            "outline-none resize-none min-h-[60px] max-h-[200px]",
            "disabled:opacity-50"
          )}
        />

        <div className="flex items-center justify-between px-3 py-2 border-t border-border">
          <div className="flex items-center gap-1">
            <AttachFileButton onFilesSelected={onFilesSelected} />
            <EmojiButton
              onEmojiSelect={(emoji) => setMessage(message + emoji?.emoji)}
            />
            <MentionButton />
            <ChannelButton />
          </div>

          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className={cn(
              "px-4 py-1.5 rounded-md",
              "bg-primary hover:bg-primary-hover",
              "text-white text-sm font-medium",
              "transition-colors flex items-center gap-2",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
