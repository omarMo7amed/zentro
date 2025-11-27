import type { Chat, Message } from "@/shared/types";

export const fetchChats = async (): Promise<Chat[]> => {
  const response = await fetch("/api/mock/chats", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chats");
  }

  return response.json();
};

export const fetchMessagesByChatId = async (
  chatId: number
): Promise<Message[]> => {
  const response = await fetch(`/api/mock/chats/${chatId}/messages`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch messages for chat ${chatId}`);
  }

  return response.json();
};
