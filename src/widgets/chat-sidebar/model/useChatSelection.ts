import { useState } from "react";

export const useChatSelection = (initialChatId: number = 0) => {
  const [selectedChatId, setSelectedChatId] = useState(initialChatId);

  const selectChat = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  return {
    selectedChatId,
    selectChat,
  };
};
