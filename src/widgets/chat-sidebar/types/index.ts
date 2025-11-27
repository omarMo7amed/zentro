import { Chat } from "@/shared/types";

export type ChatHeaderProps = {
  chat: Chat;
};

export type ChatListProps = {
  chats: Chat[];
  selectedChatId: number;
  onChatSelect: (chatId: number) => void;
};

export interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}
