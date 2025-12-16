# Infinite Scroll Hook - Refactoring

## Overview

Extracted infinite scroll logic into a reusable custom hook to follow separation of concerns and enable reusability across the application.

## New Hook: `useInfiniteScroll`

**Location:** `src/shared/lib/useInfiniteScroll.ts`

### Purpose

Provides a generic, reusable infinite scroll functionality using the IntersectionObserver API.

### API

```typescript
const { lastElementRef } = useInfiniteScroll({
  onLoadMore: () => void,    // Callback when more items should load
  hasMore: boolean,          // Whether there are more items to load
  isLoading: boolean,        // Current loading state
  rootMargin?: string,       // How early to trigger (default: "100px")
  threshold?: number,        // Intersection threshold (default: 1.0)
});
```

### Features

- ✅ **Automatic cleanup** - Disconnects observers when component unmounts
- ✅ **Prevents duplicate calls** - Won't trigger if already loading or no more items
- ✅ **Configurable trigger point** - Use `rootMargin` to load before reaching the end
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Memoized** - Uses `useCallback` for performance

## Usage Examples

### Example 1: Chat List (Current Implementation)

```tsx
import { useInfiniteScroll } from "@/shared/lib";

function ChatList() {
  const { chats, hasMore, isLoading, loadMore } = useChats();

  const { lastElementRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    isLoading,
    rootMargin: "200px", // Start loading 200px before end
  });

  return (
    <div>
      {chats.map((chat, index) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          ref={index === chats.length - 1 ? lastElementRef : null}
        />
      ))}
    </div>
  );
}
```

### Example 2: Message List

```tsx
function MessageList() {
  const { messages, hasMore, isLoading, loadOlder } = useMessages(chatId);

  const { lastElementRef } = useInfiniteScroll({
    onLoadMore: loadOlder,
    hasMore,
    isLoading,
  });

  return (
    <div>
      {messages.map((msg, index) => (
        <Message
          key={msg.id}
          message={msg}
          ref={index === messages.length - 1 ? lastElementRef : null}
        />
      ))}
    </div>
  );
}
```

### Example 3: Search Results

```tsx
function SearchResults() {
  const { results, hasMore, isLoading, loadMore } = useSearch(query);

  const { lastElementRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    isLoading,
    rootMargin: "500px", // Load 500px before end for smoother experience
    threshold: 0.5, // Trigger at 50% visibility
  });

  return (
    <div>
      {results.map((item, index) => (
        <SearchResultItem
          key={item.id}
          item={item}
          ref={index === results.length - 1 ? lastElementRef : null}
        />
      ))}
    </div>
  );
}
```

## Benefits of This Refactoring

### Before (In ChatList.tsx)

```tsx
// ❌ 20+ lines of IntersectionObserver logic
// ❌ Tightly coupled to ChatList
// ❌ Hard to reuse
// ❌ Tests would need to test both UI and scroll logic

const observer = useRef<IntersectionObserver | null>(null);

const lastChatRef = useCallback(
  (node: HTMLDivElement) => {
    if (!node) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    observer.current.observe(node);
  },
  [loadMore]
);
```

### After (Using Hook)

```tsx
// ✅ Single line
// ✅ Reusable everywhere
// ✅ Configurable
// ✅ Testable in isolation

const { lastElementRef } = useInfiniteScroll({
  onLoadMore: loadMore,
  hasMore,
  isLoading,
  rootMargin: "200px",
});
```

## Configuration Options

### `rootMargin`

Controls how early to trigger loading:

- `"0px"` - Trigger when element is visible
- `"100px"` - Trigger 100px before element enters viewport
- `"50%"` - Trigger when element is 50% of viewport height away
- `"-100px"` - Trigger 100px after element enters viewport

### `threshold`

Controls what percentage of element must be visible:

- `0.0` - Any pixel visible triggers
- `0.5` - 50% visible triggers
- `1.0` - 100% visible triggers (default)

## Testing

The hook can be tested independently:

```typescript
import { renderHook } from "@testing-library/react";
import { useInfiniteScroll } from "./useInfiniteScroll";

test("calls onLoadMore when last element is visible", () => {
  const onLoadMore = jest.fn();

  const { result } = renderHook(() =>
    useInfiniteScroll({
      onLoadMore,
      hasMore: true,
      isLoading: false,
    })
  );

  // Simulate intersection
  // ... test logic

  expect(onLoadMore).toHaveBeenCalled();
});
```

## Best Practices

1. **Always attach to the last item** in your list
2. **Use `rootMargin`** to start loading before user reaches the end
3. **Pass stable references** to `onLoadMore` (use `useCallback`)
4. **Handle loading states** properly to prevent duplicate calls
5. **Add loading indicators** below the list to show progress

## Next Steps

Consider adding:

- Error handling for failed loads
- Retry logic
- Skeleton loaders
- "Load More" button fallback for accessibility
