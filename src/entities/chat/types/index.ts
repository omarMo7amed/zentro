export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  online: boolean;
}

export interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export type ChatProps = Promise<{
  chats: Chat[];
  pagination: {
    pageSize: number;
    totalPages: number;
    totalChats: number;
    hasMore: boolean;
  };
}>;
