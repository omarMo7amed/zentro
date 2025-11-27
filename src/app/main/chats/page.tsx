"use client";
import { ChatHeader, useChatSelection } from "@/widgets/chats";
import { ChatListSidebar } from "@/widgets/chat-sidebar";
import { ChatArea } from "@/widgets/chat-area";
import { Chat } from "@/shared/types";
import { useEffect, useState } from "react";
import { fetchChats } from "@/widgets/chat-area/api";

export default function Page() {
  const [chats, setChats] = useState<Chat[]>([]);
  const { selectedChatId, selectChat } = useChatSelection(0);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };
    loadChats();
  }, []);

  const selectedChat =
    chats.find((chat) => chat.id === selectedChatId) || chats[0];

  return (
    <div className="h-full flex bg-background">
      <div className="flex-1 flex flex-col">
        {selectedChat && <ChatHeader chat={selectedChat} />}
        <div className="flex-1 overflow-y-hidden">
          <ChatArea />
        </div>
      </div>

      <ChatListSidebar
        chats={chats}
        selectedChatId={selectedChatId}
        onChatSelect={selectChat}
      />
    </div>
  );
}
