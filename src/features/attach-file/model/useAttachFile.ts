"use client";
import { UseAttachFileProps, UseAttachFileReturn } from "../types";
import { useRef } from "react";
export default function useAttachFile({
  onFileSelect,
  accept = "*/*",
  multiple = true,
}: UseAttachFileProps): UseAttachFileReturn {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function fileInputPacker() {
    fileInputRef.current?.click();
  }

  return {
    fileInputRef,
    openFilePicker: fileInputPacker,
  };
}
