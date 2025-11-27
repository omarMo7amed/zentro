"use client";

import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { useEffect, useState } from "react";
import { fetchMessagesByChatId } from "../api";
import type { Message } from "@/shared/types";

export default function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchMessagesByChatId(0);
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      <MessageList messages={messages} isLoading={isLoading} />

      <MessageInput />
    </div>
  );
}
