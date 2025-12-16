"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { SocketContextType } from "../types/socket";

export const SocketContext = createContext<SocketContextType | null>(null);

export function SocketContextProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "";

    const socketInstance = io(socketUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: false,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setSocket(socketInstance);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    socketInstance.connect();

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketContextProvider");
  }
  return context;
}
