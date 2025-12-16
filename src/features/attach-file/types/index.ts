export interface UseAttachFileProps {
  onFileSelect?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export interface UseAttachFileReturn {
  openFilePicker: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}
