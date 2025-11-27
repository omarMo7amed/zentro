// "use client";

// import { useEffect, useState } from "react";
// // import { fetchChats, fetchMessagesByChatId } from "../api";
// import { useChatSelection } from "../model/useChatSelection";
// import type { Message } from "@/shared/types";

// import { Chat } from "@/shared/types";

// export default function Chats() {
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { selectedChatId, selectChat } = useChatSelection(0);

//   // Fetch chats on mount - simulates: GET /api/chats
//   useEffect(() => {
//     const loadChats = async () => {
//       try {
//         const data = await fetchChats();

//         console.log("Chats:", data);

//         setChats(data);
//       } catch (error) {
//         console.error("Failed to fetch chats:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadChats();
//   }, []);

//   // Fetch messages when selected chat changes - simulates: GET /api/chats/:id/messages
//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         const data = await fetchMessagesByChatId(selectedChatId);
//         setMessages(data);
//       } catch (error) {
//         console.error("Failed to fetch messages:", error);
//       }
//     };

//     if (chats.length > 0) {
//       loadMessages();
//     }
//   }, [selectedChatId, chats.length]);

//   if (isLoading) {
//     return (
//       <div className="h-full flex items-center justify-center bg-background">
//         <div className="text-text-muted">Loading chats...</div>
//       </div>
//     );
//   }
// }
