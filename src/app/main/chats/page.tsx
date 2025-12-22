"use client";
import { useState } from "react";
import { ChatListSidebar, useChatSelection } from "@/widgets/chat-sidebar";
import { MessageInput } from "@/widgets/message-input";
import { ChatHeader } from "@/widgets/chat-header";
import { ChatArea } from "@/widgets/chat-area";
import { useChats } from "@/entities/chat";
import { useCall, EmbeddedCallScreen } from "@/features/video-call";

export default function Page() {
  const { chats, hasMore, loadMore, isLoading, updateChatOptimistically } =
    useChats();
  const { selectedChatId, selectChat } = useChatSelection(0);
  const { callState } = useCall();
  const [showChatDuringCall, setShowChatDuringCall] = useState(false);

  const selectedChat =
    chats.find((chat) => chat.id === selectedChatId) || chats[0];

  // Check if there's an active call for the current chat
  // const isInCall =
  //   (callState.status === "connected" || callState.status === "connecting") &&
  //   callState.chatId === selectedChatId;

  const isInCall = callState.status == "connected";
  return (
    <div className="h-full flex bg-background">
      {/* Main content area - ChatHeader + ChatArea get replaced when in call */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {isInCall ? (
          // CALL MODE
          <EmbeddedCallScreen
            onToggleChat={() => setShowChatDuringCall(!showChatDuringCall)}
            showChat={showChatDuringCall}
          />
        ) : (
          // NORMAL MODE
          <>
            {selectedChat && <ChatHeader chat={selectedChat} />}
            <div className="flex-1 flex flex-col overflow-hidden">
              <ChatArea chatId={selectedChatId} />
              <MessageInput
                chatId={selectedChatId}
                onMessageSent={(message) =>
                  updateChatOptimistically(selectedChatId, message)
                }
              />
            </div>
          </>
        )}
      </div>

      {/* Sidebar always visible - can switch chats while in call */}
      <ChatListSidebar
        chats={chats}
        selectedChatId={selectedChatId}
        onChatSelect={selectChat}
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={loadMore}
      />
    </div>
  );
}
