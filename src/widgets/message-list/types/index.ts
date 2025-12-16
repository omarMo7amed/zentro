import { MessageType } from "@/entities/message";
import { Virtualizer } from "@tanstack/react-virtual";

export type MessageListProps = {
  messages: MessageType[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  pageSize?: number;
  page?: number;
};
export type MessageWithId = { id: string | number };
export interface UseMessageListScrollProps<T extends MessageWithId> {
  messages: T[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  parentRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  isLoading: boolean;
  page: number;
  onLoadMore: () => void;
}
