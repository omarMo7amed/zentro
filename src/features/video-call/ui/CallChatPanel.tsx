import { X } from "lucide-react";

interface CallChatPanelProps {
  participantName: string;
  onClose: () => void;
}

export function CallChatPanel({
  participantName,
  onClose,
}: CallChatPanelProps) {
  return (
    <div className="w-80 flex flex-col bg-background-elevated border-l border-border">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <h4 className="text-text-primary font-medium text-sm">Chat</h4>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-3">
          {/* Demo messages */}
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-xs text-text-primary">
              {participantName.charAt(0).toUpperCase()}
            </div>
            <div className="bg-surface rounded-lg px-3 py-2 text-sm text-text-primary max-w-[200px]">
              Hey! Can you see my screen?
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <div className="bg-primary rounded-lg px-3 py-2 text-sm text-primary-foreground max-w-[200px]">
              Yes, looks great! 👍
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 border-t border-border">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full bg-input rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted border border-input-border focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
}
