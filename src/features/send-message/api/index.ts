export default async function sendMessage(chatId: number, content: string) {
  fetch(`/api/mock/chats/${chatId}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
