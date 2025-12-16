import { EmojiClickData } from "emoji-picker-react";

export type MessageInputProps = {
  chatId?: number;
  onMessageSent?: (message: string) => void;
  onFilesSelected?: (files: File[]) => void;
};

export type AttachFileButtonProps = {
  onFilesSelected?: (files: File[]) => void;
};

export type EmojiButtonProps = {
  onEmojiSelect?: (emoji: EmojiClickData) => void;
};
