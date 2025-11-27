# API Integration Guide

This document explains how to replace the mock data with real PostgreSQL-backed API endpoints.

## Current Mock Setup

The chats widget currently uses mock data that **simulates** API calls:

```typescript
// src/widgets/chats-widget/lib/index.ts
export const fetchChats = async (): Promise<Chat[]> => {
  // Simulates: GET /api/chats
  await new Promise((resolve) => setTimeout(resolve, 100));
  return chatsData as Chat[];
};

export const fetchMessagesByChatId = async (
  chatId: number
): Promise<Message[]> => {
  // Simulates: GET /api/chats/:chatId/messages
  await new Promise((resolve) => setTimeout(resolve, 50));
  const allMessages = messagesData as Record<string, Message[]>;
  return allMessages[chatId.toString()] || [];
};
```

## When You're Ready for Real APIs

### Step 1: Create Next.js API Routes

Create these API route files:

**`src/app/api/chats/route.ts`** - List all chats

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma"; // Your Prisma client

export async function GET() {
  try {
    const chats = await prisma.chat.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        lastMessage: true,
        participants: true,
      },
    });

    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}
```

**`src/app/api/chats/[chatId]/messages/route.ts`** - Get messages for a chat

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const messages = await prisma.message.findMany({
      where: { chatId: parseInt(params.chatId) },
      orderBy: { createdAt: "asc" },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
```

### Step 2: Update Data Layer

Simply replace the mock implementations in `src/widgets/chats-widget/lib/index.ts`:

```typescript
// BEFORE (Mock)
export const fetchChats = async (): Promise<Chat[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return chatsData as Chat[];
};

// AFTER (Real API)
export const fetchChats = async (): Promise<Chat[]> => {
  const response = await fetch("/api/chats");
  if (!response.ok) throw new Error("Failed to fetch chats");
  return response.json();
};
```

```typescript
// BEFORE (Mock)
export const fetchMessagesByChatId = async (
  chatId: number
): Promise<Message[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const allMessages = messagesData as Record<string, Message[]>;
  return allMessages[chatId.toString()] || [];
};

// AFTER (Real API)
export const fetchMessagesByChatId = async (
  chatId: number
): Promise<Message[]> => {
  const response = await fetch(`/api/chats/${chatId}/messages`);
  if (!response.ok) throw new Error("Failed to fetch messages");
  return response.json();
};
```

### Step 3: Update Types (If Needed)

Your PostgreSQL schema might have additional fields. Update `src/widgets/chats-widget/types/index.ts`:

```typescript
export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  // Add new fields from your database
  createdAt?: Date;
  updatedAt?: Date;
  participants?: User[];
}

export interface Message {
  id: number;
  author: string;
  isMe: boolean;
  content: string;
  time: string;
  // Add new fields from your database
  chatId?: number;
  authorId?: number;
  createdAt?: Date;
}
```

## No Changes Needed in Components!

The beauty of this architecture is that your UI components (`ChatsWidget.tsx`, `ChatListSidebar.tsx`, etc.) **don't need any changes**. They already use async data fetching with `useEffect`, so they'll work seamlessly with real APIs.

## Example PostgreSQL Schema

Here's a suggested Prisma schema for your database:

```prisma
// prisma/schema.prisma

model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  avatar    String?
  online    Boolean   @default(false)
  chats     Chat[]    @relation("ChatParticipants")
  messages  Message[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Chat {
  id           Int       @id @default(autoincrement())
  name         String
  isGroup      Boolean   @default(false)
  participants User[]    @relation("ChatParticipants")
  messages     Message[]
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

model Message {
  id        Int      @id @default(autoincrement())
  content   String
  chatId    Int
  chat      Chat     @relation(fields: [chatId], references: [id])
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())

  @@index([chatId])
  @@index([authorId])
}
```

## Migration Path

1. ✅ **Now**: Using mock JSON data with async functions
2. 🔄 **Next**: Set up PostgreSQL + Prisma
3. 🔄 **Then**: Create Next.js API routes
4. 🔄 **Finally**: Update `lib/index.ts` to call real APIs
5. ✅ **Done**: No UI component changes needed!

## Environment Variables

Don't forget to add your database connection:

```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/zentro"
```

## Testing Both Mock and Real Data

You can keep both implementations and switch via environment variable:

```typescript
// src/widgets/chats-widget/lib/index.ts
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export const fetchChats = async (): Promise<Chat[]> => {
  if (USE_MOCK_DATA) {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 100));
    return chatsData as Chat[];
  }

  // Real API implementation
  const response = await fetch("/api/chats");
  if (!response.ok) throw new Error("Failed to fetch chats");
  return response.json();
};
```

This allows you to develop without a database connection when needed!
