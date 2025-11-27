# Chats Widget - FSD Architecture

This document explains the Feature-Sliced Design (FSD) architecture of the chats widget.

## Directory Structure

```
src/widgets/chats-widget/
├── api/                         # API Layer - All HTTP requests
│   └── index.ts                # fetchChats, fetchMessagesByChatId
├── lib/                         # Utilities & Mock Data
│   ├── chats-mock.json         # Mock chat data
│   ├── messages-mock.json      # Mock messages data
│   └── index.ts                # getMockChats, getMockMessagesByChatId
├── model/                       # Business Logic & State
│   └── useChatSelection.ts     # Chat selection hook
├── types/                       # TypeScript Definitions
│   └── index.ts                # Chat, Message interfaces
├── ui/                          # UI Components
│   ├── ChatsWidget.tsx         # Main orchestrator
│   ├── ChatListSidebar.tsx     # Sidebar with search
│   ├── ChatListItem.tsx        # Individual chat item
│   ├── ChatHeader.tsx          # Header with actions
│   ├── MessageList.tsx         # Messages container
│   ├── MessageBubble.tsx       # Message bubble
│   └── MessageInput.tsx        # Input with buttons
├── index.ts                     # Barrel exports
└── API_INTEGRATION.md          # Integration guide
```

## Layer Responsibilities

### 📡 `api/` - API Layer

**Purpose**: Handle all HTTP requests to backend services

- `fetchChats()` - GET /api/mock/chats (later: /api/chats)
- `fetchMessagesByChatId(id)` - GET /api/mock/chats/:id/messages

**Key Points**:

- All `fetch()` calls live here
- Easy to swap mock→real APIs by changing URLs
- Error handling included
- Returns typed Promises

### 📚 `lib/` - Library/Utilities

**Purpose**: Helper functions and mock data

- `getMockChats()` - Returns mock chat array
- `getMockMessagesByChatId(id)` - Returns mock messages
- JSON files for mock data

**Key Points**:

- Pure functions, no side effects
- Used by mock API routes
- When backend ready, this folder becomes just utilities

### 🧠 `model/` - Business Logic

**Purpose**: State management and business rules

- `useChatSelection` - Hook for managing selected chat

**Key Points**:

- React hooks for state
- Business logic goes here
- Reusable across components

### 📝 `types/` - Type Definitions

**Purpose**: TypeScript interfaces and types

- `Chat` interface
- `Message` interface

**Key Points**:

- Shared across all layers
- Single source of truth for data shapes
- Matches database schema

### 🎨 `ui/` - User Interface

**Purpose**: React components for rendering

- 7 components total
- Each has single responsibility
- No API calls (uses api layer)
- No business logic (uses model layer)

## Data Flow

```
User clicks chat
     ↓
ChatListItem (ui) calls onChatSelect
     ↓
ChatsWidget (ui) updates selectedChatId
     ↓
useEffect triggers
     ↓
fetchMessagesByChatId (api) called
     ↓
GET /api/mock/chats/:id/messages
     ↓
getMockMessagesByChatId (lib) fetches mock data
     ↓
JSON returned to ChatsWidget
     ↓
MessageList renders messages
```

## Migration Path: Mock → Real API

### Current (Mock)

```typescript
// api/index.ts
export const fetchChats = async (): Promise<Chat[]> => {
  const response = await fetch("/api/mock/chats");
  return response.json();
};
```

### Future (PostgreSQL)

```typescript
// api/index.ts - ONLY change the URL!
export const fetchChats = async (): Promise<Chat[]> => {
  const response = await fetch("/api/chats"); // ← URL changed
  return response.json();
};
```

Then create the real API route:

```typescript
// app/api/chats/route.ts
export async function GET() {
  const chats = await prisma.chat.findMany();
  return NextResponse.json(chats);
}
```

**No UI components need changes!** ✅

## Why This Architecture?

### ✅ Separation of Concerns

Each layer has ONE job:

- `api/` - Talk to backend
- `lib/` - Provide utilities
- `model/` - Manage state
- `types/` - Define shapes
- `ui/` - Render views

### ✅ Easy Testing

Test layers independently:

```typescript
// Test API layer
expect(await fetchChats()).toEqual([...]);

// Test UI with mock data
render(<ChatListItem chat={mockChat} />);
```

### ✅ Scalability

Add features without breaking existing code:

```
api/
  ├── index.ts           # Chat endpoints
  ├── search.ts          # NEW: Search endpoint
  └── notifications.ts   # NEW: Notifications
```

### ✅ Team Collaboration

Different devs work on different layers:

- Backend dev: Updates `api/` layer
- UI/UX dev: Works on `ui/` components
- State management: Focuses on `model/`

## API Routes Structure

```
src/app/api/
├── mock/                      # Mock API routes (current)
│   └── chats/
│       ├── route.ts          # GET /api/mock/chats
│       └── [chatId]/
│           └── messages/
│               └── route.ts  # GET /api/mock/chats/:id/messages
│
└── (future structure)
    └── chats/
        ├── route.ts          # GET /api/chats
        └── [chatId]/
            └── messages/
                └── route.ts  # GET /api/chats/:id/messages
```

## Example: Adding a New Feature

Want to add "search chats" feature?

1. **Create API function** (`api/search.ts`):

```typescript
export const searchChats = async (query: string) => {
  const response = await fetch(`/api/chats/search?q=${query}`);
  return response.json();
};
```

2. **Create search hook** (`model/useSearch.ts`):

```typescript
export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  // ... logic
};
```

3. **Update UI** (`ui/ChatListSidebar.tsx`):

```typescript
const { results } = useSearch();
// Render results
```

No changes needed to existing components! 🎉
