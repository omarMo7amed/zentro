"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { useCall } from "../model/callContext";
import type { CallStatus } from "../types";

/**
 * Demo component to preview call UI without making actual calls
 * Add this component anywhere to test the UI
 */
export function CallDemo() {
  const [showPanel, setShowPanel] = useState(false);
  const { callState, setDemoState, endCall } = useCall();

  const handleDemoMode = (status: CallStatus) => {
    setDemoState(status, "video");
  };

  const handleClose = () => {
    endCall();
  };

  const isActive = callState.status !== "idle";

  return (
    <>
      {/* Floating Demo Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-4 right-4 z-[100] w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-text-primary shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        title="Toggle Call Demo Panel"
      >
        {showPanel ? <X className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      {/* Demo Control Panel */}
      {showPanel && (
        <div className="fixed bottom-20 right-4 z-[100] w-64 rounded-xl glass-card p-4 shadow-2xl">
          <h3 className="text-text-primary font-semibold mb-3">
            📞 Call UI Demo
          </h3>
          <p className="text-text-muted text-xs mb-3">
            Current: <span className="text-primary">{callState.status}</span>
          </p>
          <div className="space-y-2">
            <button
              onClick={() => handleDemoMode("incoming")}
              className="w-full px-3 py-2 rounded-lg bg-success/20 text-success hover:bg-success/30 transition-colors text-sm text-left"
            >
              🔔 Incoming Call
            </button>
            <button
              onClick={() => handleDemoMode("outgoing")}
              className="w-full px-3 py-2 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors text-sm text-left"
            >
              📱 Outgoing Call
            </button>
            <button
              onClick={() => handleDemoMode("connected")}
              className="w-full px-3 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors text-sm text-left"
            >
              🎥 Connected Call
            </button>
            {isActive && (
              <button
                onClick={handleClose}
                className="w-full px-3 py-2 rounded-lg bg-error/20 text-error hover:bg-error/30 transition-colors text-sm text-left"
              >
                ❌ End Demo Call
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
