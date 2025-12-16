# zentro

### issues and how to fix them

-1. reorder chats when new message is sent

    (the first solution)
        - You send a message
        - The backend updates the chat's lastMessageAt
        - The frontend re-fetches the chats
        - The API returns the chats sorted by the new time
        - ChatList receives the new order
        - The virtualizer and CSS transitions cause a jarring experience.

    (the second solution)
        - You send a message
        - The backend saves the message to the database
        - The backend updates the chat's lastMessageAt in the database
        - The backend fetches all chats (to get the updated data)
        - The backend finds and emits ONLY the updated chat via Socket.IO
        - The frontend receives the updated chat via socket event
        - The frontend updates only that specific chat in local state
        - The frontend re-sorts the chats array by lastMessageAt
        - ChatList receives the new order
        - The virtualizer and CSS transitions animate the reorder

    (the third solution)
        - You send a message
        - The virtualizer and CSS transitions animate the reorder
        - The backend updates the chat's lastMessageAt in the database
        - The backend fetches all chats (to get the updated data)
        - The backend finds and emits ONLY the updated chat via Socket.IO
        - The frontend receives the updated chat via socket event
        - the frontend have been updated optimistically
