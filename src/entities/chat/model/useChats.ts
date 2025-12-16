import { chatHelpers } from "../lib/chatHelpers";
import { useState, useEffect } from "react";
import { useSocket } from "@/shared/lib";
import { Chat } from "../types";
import { fetchChats } from "../api";

export function useChats() {
  const [error, setError] = useState<Error | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { socket } = useSocket();
  useEffect(() => {
    const loadChats = async () => {
      try {
        setIsLoading(true);
        const { chats: newChats, pagination } = await fetchChats(page);

        if (page === 1) {
          setChats(newChats);
        } else {
          setChats((prevChats) => [...prevChats, ...newChats]);
        }
        setHasMore(pagination.hasMore);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch chats")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();

    if (!socket) return;

    const updateChat = (updatedChat: Chat) => {
      setChats((prevChats) => {
        return chatHelpers.updateChat(prevChats, updatedChat);
      });
    };

    socket.on("chat-updated", updateChat);

    return () => {
      socket.off("chat-updated", updateChat);
    };
  }, [socket, page]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const updateChatOptimistically = (chatId: number, lastMessage: string) => {
    setChats((prevChats) =>
      chatHelpers.optimisticUpdate(prevChats, chatId, lastMessage)
    );
  };

  return {
    chats,
    isLoading,
    error,
    setChats,
    page,
    setPage,
    hasMore,
    loadMore,
    updateChatOptimistically,
  };
}
