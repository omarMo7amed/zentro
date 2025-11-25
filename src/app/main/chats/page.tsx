"use client";

import { cn } from "@/shared/lib";
import { ZentroLogo } from "@/shared/ui/logo";
import {
  Search,
  Send,
  Smile,
  Paperclip,
  Phone,
  Video,
  Plus,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState(0);

  const chats = [
    {
      id: 0,
      name: "Design Team",
      lastMessage: "The new mockups look great!",
      time: "2m",
      unread: 3,
      online: true,
    },
    {
      id: 1,
      name: "Sarah Chen",
      lastMessage: "Let's collaborate on this",
      time: "15m",
      unread: 0,
      online: true,
    },
    {
      id: 2,
      name: "Dev Team",
      lastMessage: "Just shipped the new features",
      time: "1h",
      unread: 12,
      online: false,
    },
    {
      id: 3,
      name: "Mike Ross",
      lastMessage: "Code review is done",
      time: "3h",
      unread: 0,
      online: true,
    },
  ];

  const messages = [
    {
      id: 1,
      author: "Sarah",
      isMe: false,
      content: "The new mockups look great!",
      time: "2:30 PM",
    },
    {
      id: 2,
      author: "Mike",
      isMe: false,
      content: "Yeah, really like the new design direction",
      time: "2:31 PM",
    },
    {
      id: 3,
      author: "You",
      isMe: true,
      content: "Thanks! Let's ship it this week",
      time: "2:32 PM",
    },
  ];

  return (
    <div className="h-full flex overflow-hidden bg-background">
      {/* Chat List Sidebar */}
      <div
        className={cn(
          "w-80 border-r border-border",
          "bg-surface",
          "flex flex-col"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex items-center justify-between">
            <ZentroLogo />
            <button
              className={cn(
                "p-2 rounded-lg",
                "bg-primary hover:bg-primary/90",
                "text-white",
                "transition-colors"
              )}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-2",
              "bg-background-elevated rounded-lg",
              "border border-border",
              "focus-within:border-primary transition-colors"
            )}
          >
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search chats..."
              className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
            />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={selectedChat === chat.id}
              onClick={() => setSelectedChat(chat.id)}
            />
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div
          className={cn(
            "h-14 border-b border-border",
            "bg-background-elevated",
            "flex items-center justify-between px-4"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
                {chats[selectedChat].name[0]}
              </div>
              {chats[selectedChat].online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background-elevated" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-text-primary text-sm">
                {chats[selectedChat].name}
              </h2>
              <p className="text-xs text-text-muted">
                {chats[selectedChat].online ? "Active now" : "Offline"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className={cn(
                "p-2 rounded-lg",
                "hover:bg-surface transition-colors",
                "text-text-muted hover:text-text-primary"
              )}
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              className={cn(
                "p-2 rounded-lg",
                "hover:bg-surface transition-colors",
                "text-text-muted hover:text-text-primary"
              )}
            >
              <Video className="w-4 h-4" />
            </button>
            <button
              className={cn(
                "p-2 rounded-lg",
                "hover:bg-surface transition-colors",
                "text-text-muted hover:text-text-primary"
              )}
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center justify-center my-4">
            <span className="text-xs text-text-muted bg-background-elevated px-3 py-1 rounded-full">
              Today
            </span>
          </div>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background-elevated">
          <div
            className={cn(
              "flex items-end gap-2 p-3 rounded-lg",
              "bg-surface border border-border",
              "focus-within:border-primary transition-colors"
            )}
          >
            <div className="flex gap-1">
              <button
                className={cn(
                  "p-2 rounded-lg",
                  "hover:bg-surface-hover transition-colors",
                  "text-text-muted hover:text-text-primary"
                )}
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                className={cn(
                  "p-2 rounded-lg",
                  "hover:bg-surface-hover transition-colors",
                  "text-text-muted hover:text-text-primary"
                )}
              >
                <Smile className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none py-2"
            />
            <button
              className={cn(
                "p-2 rounded-lg shrink-0",
                "bg-primary hover:bg-primary/90",
                "text-white",
                "transition-colors"
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

function ChatItem({
  chat,
  isActive,
  onClick,
}: {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-3 cursor-pointer border-b border-border",
        "hover:bg-surface-hover transition-colors",
        isActive && "bg-surface-hover border-l-2 border-l-primary"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            {chat.name[0]}
          </div>
          {chat.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              className={cn(
                "font-medium text-sm truncate",
                isActive ? "text-primary" : "text-text-primary"
              )}
            >
              {chat.name}
            </span>
            <span className="text-xs text-text-muted shrink-0">
              {chat.time}
            </span>
          </div>
          <p className="text-sm text-text-muted truncate">{chat.lastMessage}</p>
        </div>
        {chat.unread > 0 && (
          <div className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-medium">
            {chat.unread}
          </div>
        )}
      </div>
    </div>
  );
}

interface Message {
  id: number;
  author: string;
  isMe: boolean;
  content: string;
  time: string;
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={cn("flex gap-3", message.isMe && "flex-row-reverse")}>
      {!message.isMe && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold shrink-0">
          {message.author[0]}
        </div>
      )}
      <div className={cn("flex flex-col gap-1", message.isMe && "items-end")}>
        <div
          className={cn(
            "px-4 py-2 rounded-2xl max-w-md",
            message.isMe
              ? "bg-primary text-white rounded-br-md"
              : "bg-surface text-text-primary rounded-bl-md"
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <span className="text-xs text-text-muted">{message.time}</span>
      </div>
    </div>
  );
}
