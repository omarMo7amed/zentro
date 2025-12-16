import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { getChats, saveMessage } from "@/shared/db";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  // Socket.IO event handlers
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    // Authentication - get user info from handshake
    const userId = socket.handshake.auth.userId;
    if (userId) {
      socket.data.userId = userId;
      console.log(`User ${userId} connected with socket ${socket.id}`);
    }

    // Join a chat room
    socket.on("join-chat", (chatId) => {
      socket.join(`chat-${chatId}`);
      console.log(`Socket ${socket.id} joined chat-${chatId}`);

      // Notify others in the room
      socket.to(`chat-${chatId}`).emit("user-joined", {
        userId: socket.data.userId,
        socketId: socket.id,
      });
    });

    // Leave a chat room
    socket.on("leave-chat", (chatId) => {
      socket.leave(`chat-${chatId}`);
      console.log(`Socket ${socket.id} left chat-${chatId}`);

      // Notify others in the room
      socket.to(`chat-${chatId}`).emit("user-left", {
        userId: socket.data.userId,
        socketId: socket.id,
      });
    });

    // Handle sending messages
    socket.on("send-message", async (data) => {
      const { chatId, message } = data;
      await saveMessage(chatId, message);

      const chats = await getChats();

      const updatedChat = chats.find((chat) => chat.id === chatId);

      io.emit("chat-updated", updatedChat);

      io.to(`chat-${chatId}`).emit("new-message", {
        ...message,
        socketId: socket.id,
      });
    });

    // Handle typing indicator
    socket.on("typing", (data) => {
      const { chatId, isTyping } = data;

      // Broadcast to others in the room (exclude sender)
      socket.to(`chat-${chatId}`).emit("user-typing", {
        userId: socket.data.userId,
        isTyping,
      });
    });

    // Handle message read receipt
    socket.on("message-read", (data) => {
      const { chatId, messageId } = data;

      // Broadcast to others in the room
      socket.to(`chat-${chatId}`).emit("message-read", {
        userId: socket.data.userId,
        messageId,
      });
    });

    // ============ VIDEO CALL EVENTS ============

    // Handle call request
    socket.on("call-request", (data) => {
      const { to, chatId, callType, offer } = data;
      console.log(`📞 Call request from ${socket.data.userId} to ${to}`);

      // Find the target socket by userId
      const targetSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.data.userId === to
      );

      if (targetSocket) {
        targetSocket.emit("call-request", {
          from: socket.data.userId,
          fromName: socket.handshake.auth.userName || "Unknown",
          fromAvatar: socket.handshake.auth.userAvatar,
          chatId,
          callType,
          offer,
        });
      } else {
        // User is offline
        socket.emit("call-decline", {
          reason: "User is offline",
        });
      }
    });

    // Handle call accept
    socket.on("call-accept", (data) => {
      const { to, answer } = data;
      console.log(`✅ Call accepted by ${socket.data.userId}`);

      const targetSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.data.userId === to
      );

      if (targetSocket) {
        targetSocket.emit("call-accept", { answer });
      }
    });

    // Handle call decline
    socket.on("call-decline", (data) => {
      const { to, reason } = data;
      console.log(`❌ Call declined by ${socket.data.userId}: ${reason}`);

      const targetSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.data.userId === to
      );

      if (targetSocket) {
        targetSocket.emit("call-decline", { reason });
      }
    });

    // Handle call end
    socket.on("call-end", (data) => {
      const { to, reason } = data;
      console.log(`📴 Call ended by ${socket.data.userId}`);

      const targetSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.data.userId === to
      );

      if (targetSocket) {
        targetSocket.emit("call-end", { reason });
      }
    });

    // Handle ICE candidate exchange
    socket.on("ice-candidate", (data) => {
      const { to, candidate } = data;

      const targetSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.data.userId === to
      );

      if (targetSocket) {
        targetSocket.emit("ice-candidate", { candidate });
      }
    });

    // Handle screen share notification
    socket.on("screen-share-start", (data) => {
      const { to } = data;

      const targetSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.data.userId === to
      );

      if (targetSocket) {
        targetSocket.emit("screen-share-start", {
          from: socket.data.userId,
        });
      }
    });

    socket.on("screen-share-stop", (data) => {
      const { to } = data;

      const targetSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.data.userId === to
      );

      if (targetSocket) {
        targetSocket.emit("screen-share-stop", {
          from: socket.data.userId,
        });
      }
    });

    // ============ END VIDEO CALL EVENTS ============

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);

      // Notify all rooms this socket was in
      const rooms = Array.from(socket.rooms);
      rooms.forEach((room) => {
        if (room.startsWith("chat-")) {
          socket.to(room).emit("user-left", {
            userId: socket.data.userId,
            socketId: socket.id,
          });
        }
      });
    });

    // Error handling
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`🚀 Ready on http://${hostname}:${port}`);
      console.log(`🔌 Socket.IO server running`);
    });
});
