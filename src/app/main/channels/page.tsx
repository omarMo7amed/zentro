"use client";
import { ChatArea } from "@/widgets/chat-area";
import { ChannelPanel } from "@/widgets/channel-panel";
import { MessageInput } from "@/widgets/message-input";

export default function ChannelsPage() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ChatArea chatId={0}>
          <MessageInput chatId={0} />
        </ChatArea>
      </div>

      {/* Channel Details Panel */}
      <ChannelPanel />
    </div>
  );
}
