import { MessageType } from "../types";

export const fetchMessagesByChatId = async (
  chatId: number,
  page: number = 1
): Promise<{
  messages: MessageType[];
  pagination: {
    pageSize: number;
    totalMessages: number;
    hasMore: boolean;
  };
}> => {
  const response = await fetch(`/api/mock/chats/${chatId}/messages?p=${page}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch messages for chat ${chatId}`);
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
