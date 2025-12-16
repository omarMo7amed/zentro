import fs from "fs/promises";
import path from "path";
import { Chat } from "@/shared";
import { MessageType } from "@/entities/message";

const DB_DIR = path.join(process.cwd(), "src/shared/db");
const MESSAGES_FILE = path.join(DB_DIR, "messages.json");
const CHATS_FILE = path.join(DB_DIR, "chats.json");

// --- Messages ---

export async function getMessages(chatId: string): Promise<MessageType[]> {
  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf-8");
    const messages = JSON.parse(data);
    return messages[chatId] || [];
  } catch (error) {
    console.error("Error reading messages:", error);
    return [];
  }
}

export async function saveMessage(
  chatId: string,
  message: MessageType
): Promise<void> {
  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf-8");
    const messages = JSON.parse(data);

    if (!messages[chatId]) {
      messages[chatId] = [];
    }

    messages[chatId].push(message);

    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));

    await updateChatLastMessage(chatId, message);
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
}

// --- Chats ---

export async function getChats(): Promise<Chat[]> {
  try {
    const data = await fs.readFile(CHATS_FILE, "utf-8");
    const chats: Chat[] = JSON.parse(data);

    return chats.sort((a, b) => {
      const dateA = new Date(a.lastMessageAt).getTime();
      const dateB = new Date(b.lastMessageAt).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error reading chats:", error);
    return [];
  }
}

async function updateChatLastMessage(chatId: string, message: MessageType) {
  try {
    const data = await fs.readFile(CHATS_FILE, "utf-8");
    const chats: Chat[] = JSON.parse(data);

    const chatIndex = chats.findIndex((c) => c.id === Number(chatId));
    if (chatIndex !== -1) {
      chats[chatIndex].lastMessage = message.content;
      chats[chatIndex].lastMessageAt = message.createdAt;
      chats[chatIndex].unread = 0;

      await fs.writeFile(CHATS_FILE, JSON.stringify(chats, null, 2));
    }
  } catch (error) {
    console.error("Error updating chat last message:", error);
  }
}
