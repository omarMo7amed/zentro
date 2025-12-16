import { Chat } from "@/entities/chat";

export type ChatListProps = {
  chats: Chat[];
  selectedChatId: number;
  onChatSelect: (chatId: number) => void;
  hasMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
};
