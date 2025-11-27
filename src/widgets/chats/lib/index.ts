import chatsData from "./chats-mock.json";
import messagesData from "./messages-mock.json";
import type { Chat, Message } from "../types";

export const getMockChats = (): Chat[] => {
  return chatsData as Chat[];
};

export const getMockMessagesByChatId = (chatId: number): Message[] => {
  const messages = messagesData as Record<string, Message[]>;
  return messages[chatId.toString()] || [];
};
