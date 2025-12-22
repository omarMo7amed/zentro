"use client";

import { createContext, useContext, ReactNode } from "react";
import { CallContextType, CallType, CallStatus } from "../types";
import { useCallState } from "./useCallState";
import { usePeerConnection } from "./usePeerConnection";
import { useCallCleanup } from "./useCallCleanup";
import { useCallActions } from "./useCallActions";
import { useCallSocketEvents } from "./useCallSocketEvents";

const CallContext = createContext<CallContextType | null>(null);

export function CallProvider({ children }: { children: ReactNode }) {
  const { callState, dispatch } = useCallState();
  const { peerConnectionRef, pendingOfferRef, iceCandidatesQueue } =
    usePeerConnection();
  const cleanup = useCallCleanup({
    callState,
    peerConnectionRef,
    pendingOfferRef,
    iceCandidatesQueue,
    dispatch,
  });
  const actions = useCallActions({
    callState,
    dispatch,
    peerConnectionRef,
    pendingOfferRef,
    iceCandidatesQueue,
    cleanup,
  });
  useCallSocketEvents({
    dispatch,
    peerConnectionRef,
    pendingOfferRef,
    iceCandidatesQueue,
    cleanup,
  });

  // Demo state logic (unchanged)
  const setDemoState = (status: CallStatus, callType: CallType = "video") => {
    if (status === "idle") {
      dispatch({ type: "RESET" });
    } else {
      dispatch({ type: "SET_DEMO_STATE", payload: { status, callType } });
    }
  };

  return (
    <CallContext.Provider
      value={{
        callState,
        ...actions,
        setDemoState,
      }}
    >
      {children}
    </CallContext.Provider>
  );
}

export function useCall(): CallContextType {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
}
