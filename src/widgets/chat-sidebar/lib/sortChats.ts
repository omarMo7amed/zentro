import { Chat } from "@/entities/chat";

export function sortChats(chats: Chat[]) {
  return chats.sort((a, b) => {
    return (
      new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
    );
  });
}
