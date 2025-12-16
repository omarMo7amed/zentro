import { useSocket } from "@/shared/providers";
import { useState, useCallback } from "react";
import { socketHelpers } from "@/shared/lib";
import { SendMessageProps } from "../types";
import { MessageType } from "@/entities/message";

export function useSendMessage({ chatId }: SendMessageProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { socket } = useSocket();

  const sendMessage = useCallback(async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      if (socket) {
        const newMessage: MessageType = {
          id: Date.now(),
          content: message.trim(),
          createdAt: new Date().toISOString(),
          author: "Me",
          isMe: true,
        };

        socketHelpers.sendMessage(socket, chatId, newMessage);
      }

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  }, [chatId, message, socket]);

  return {
    message,
    setMessage,
    sendMessage,
    isLoading,
  };
}
