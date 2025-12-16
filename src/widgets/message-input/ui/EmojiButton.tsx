"use client";

import { useClickOutside } from "@/shared/lib/useClickOutside";
import { EmojiButtonProps } from "../types";
import { Theme } from "emoji-picker-react";
import { Smile } from "lucide-react";
import dynamic from "next/dynamic";
import { cn } from "@/shared/lib";
import { useState } from "react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => (
    <div className="w-80 h-96 animate-pulse bg-surface rounded-lg" />
  ),
});

export default function EmojiButton({ onEmojiSelect }: EmojiButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 rounded-lg",
          "hover:bg-surface-hover transition-colors",
          "text-text-muted hover:text-text-primary",
          isOpen && "bg-surface-hover text-text-primary"
        )}
        aria-label="Insert emoji"
      >
        <Smile className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className={cn("absolute bottom-full left-0 mb-5", "z-50")}>
          <EmojiPicker
            autoFocusSearch={false}
            height={400}
            width={350}
            theme={"dark" as Theme}
            previewConfig={{
              showPreview: false,
            }}
            skinTonesDisabled={true}
            onEmojiClick={onEmojiSelect}
          />
        </div>
      )}
    </div>
  );
}
