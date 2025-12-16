import { Clock, MessageSquare, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/shared";

interface CallHeaderProps {
  participantName: string;
  duration: number;
  isVideoCall: boolean;
  isFullscreen: boolean;
  onToggleChat: () => void;
  onFullscreen: () => void;
  showChat: boolean;
  callStatus: string;
}

export function CallHeader({
  participantName,
  duration,
  isVideoCall,
  isFullscreen,
  onToggleChat,
  onFullscreen,
  showChat,
  callStatus,
}: CallHeaderProps) {
  function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="h-14 bg-background-elevated border-b border-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-text-primary font-medium">
              {participantName.charAt(0).toUpperCase()}
            </span>
          </div>
          {/* Live indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-background-elevated" />
        </div>
        <div>
          <h3 className="text-text-primary font-medium text-sm">
            {participantName}
          </h3>
          <div className="flex items-center gap-1.5 text-xs">
            {callStatus === "connected" ? (
              <>
                <span className="text-success flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(duration)}
                </span>
                <span className="text-text-muted">
                  • {isVideoCall ? "Video call" : "Voice call"}
                </span>
              </>
            ) : (
              <span className="text-warning">Connecting...</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Toggle Chat */}
        <button
          onClick={onToggleChat}
          className={cn(
            "p-2 rounded-lg transition-colors",
            showChat
              ? "bg-primary/20 text-primary"
              : "hover:bg-surface text-text-muted hover:text-text-primary"
          )}
          title="Toggle chat"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
        {/* Fullscreen */}
        <button
          onClick={onFullscreen}
          className="p-2 rounded-lg hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
