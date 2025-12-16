import { Chat } from "../types";

export const chatHelpers = {
  //to make the time complexity of updateChat O(n) instead of O(nlog(n))
  updateChat: (chats: Chat[], updatedChat: Chat) => {
    const filteredChats = chats.filter((c) => c.id !== updatedChat.id);

    return [updatedChat, ...filteredChats];
  },
  //to solve the problem of chat list not updating when user sends a message immediately
  optimisticUpdate: (chats: Chat[], chatId: number, lastMessage: string) => {
    const now = new Date().toISOString();

    const chatIndex = chats.findIndex((c) => c.id === chatId);
    if (chatIndex === -1) return chats;

    const updatedChat = {
      ...chats[chatIndex],
      lastMessage,
      lastMessageAt: now,
    };

    const filteredChats = chats.filter((c) => c.id !== chatId);

    return [updatedChat, ...filteredChats];
  },
};
