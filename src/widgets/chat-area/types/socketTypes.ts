/* eslint-disable @typescript-eslint/no-explicit-any */
export type SocketEvents = {
  // Client to Server
  "join-chat": (chatId: number) => void;
  "leave-chat": (chatId: number) => void;
  "send-message": (data: { chatId: number; message: any }) => void;
  typing: (data: { chatId: number; isTyping: boolean }) => void;
  "message-read": (data: { chatId: number; messageId: number }) => void;

  // Server to Client
  "new-message": (message: any) => void;
  "user-typing": (data: { userId: string; isTyping: boolean }) => void;
  "user-joined": (data: { userId: string; socketId: string }) => void;
  "user-left": (data: { userId: string; socketId: string }) => void;
};
