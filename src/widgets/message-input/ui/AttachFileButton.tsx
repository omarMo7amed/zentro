import { cn } from "@/shared/lib";
import { Paperclip } from "lucide-react";
import { useAttachFile } from "@/features/attach-file";
import { AttachFileButtonProps } from "../types";

export default function AttachFileButton({
  onFilesSelected,
}: AttachFileButtonProps) {
  const { openFilePicker, fileInputRef } = useAttachFile({
    onFileSelect: onFilesSelected,
    accept: "image/*,video/*,audio/*,.pdf,.doc,.docx",
    multiple: true,
  });

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        aria-label="File attachment input"
      />
      <button
        type="button"
        onClick={openFilePicker}
        className={cn(
          "p-2 rounded-lg",
          "hover:bg-surface-hover transition-colors",
          "text-text-muted hover:text-text-primary"
        )}
        aria-label="Attach file"
      >
        <Paperclip className="w-4 h-4" />
      </button>
    </>
  );
}
