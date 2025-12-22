"use client";

import useShareScreen from "../model/useShareScreen";

export default function ScreenShare() {
  const { ScreenShareVideoRef, isScreenSharing } = useShareScreen();
  if (!isScreenSharing) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
      <video
        ref={ScreenShareVideoRef}
        autoPlay
        playsInline
        muted
        className="w-[400px] h-[400px] rounded-xl shadow-lg border border-white"
      />
    </div>
  );
}
