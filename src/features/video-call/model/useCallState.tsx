import { useReducer } from "react";
import { callReducer } from "../lib/callReducer";
import { initialCallState } from "../types";

export function useCallState() {
  const [callState, dispatch] = useReducer(callReducer, initialCallState);
  return { callState, dispatch };
}
