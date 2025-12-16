import type { Chat } from "@/entities/chat";
import type { MessageType } from "@/entities/message";

export const fetchChats = async (): Promise<Chat[]> => {
  const response = await fetch("/api/mock/chats", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chats");
  }

  return response.json();
};

export const sendMessage = async (
  chatId: number,
  content: string
): Promise<MessageType> => {
  const response = await fetch(`/api/mock/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
};
