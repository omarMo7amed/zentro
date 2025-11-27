import { getMockMessagesByChatId } from "@/widgets/chats/lib";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  ctx: {
    params: {
      chatId: string;
    };
  }
) {
  const { chatId } = await ctx.params;
  if (!chatId) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }
  const messages = getMockMessagesByChatId(Number(chatId));
  return NextResponse.json(messages);
}
