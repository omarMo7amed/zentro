import { ChatProps } from "../types";

export const fetchChats = async (page: number = 1): ChatProps => {
  const response = await fetch(`/api/mock/chats?p=${page}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chats");
  }

  return response.json();
};
