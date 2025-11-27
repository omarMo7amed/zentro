import { Chat } from "@/shared/types";

export type Message = {
  id: number;
  author: string;
  isMe: boolean;
  content: string;
  time: string;
};

export type ChatHeaderProps = {
  chat: Chat;
};

export type ChatListProps = {
  chats: Chat[];
  selectedChatId: number;
  onChatSelect: (chatId: number) => void;
};
