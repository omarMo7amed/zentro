/* eslint-disable @typescript-eslint/no-explicit-any */

// Socket Hook Helper Functions
export const socketHelpers = {
  joinChat: (socket: any, chatId: number) => {
    socket?.emit("join-chat", chatId);
  },

  // Leave a chat room
  leaveChat: (socket: any, chatId: number) => {
    socket?.emit("leave-chat", chatId);
  },

  // Send a message
  sendMessage: (socket: any, chatId: number, message: any) => {
    socket?.emit("send-message", { chatId, message });
  },

  // Send typing indicator
  setTyping: (socket: any, chatId: number, isTyping: boolean) => {
    socket?.emit("typing", { chatId, isTyping });
  },

  // Mark message as read
  markAsRead: (socket: any, chatId: number, messageId: number) => {
    socket?.emit("message-read", { chatId, messageId });
  },
};
