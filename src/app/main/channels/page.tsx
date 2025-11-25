import { ChatArea } from "@/widgets/chat-area";
import { ChannelPanel } from "@/widgets/channel-panel";

export default function ChannelsPage() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ChatArea />
      </div>

      {/* Channel Details Panel */}
      <ChannelPanel />
    </div>
  );
}
