import { NextRequest, NextResponse } from "next/server";
import { getMessages } from "@/shared/db";

const PAGE_SIZE = 50;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { chatId } = await params;
  const pageParam = request.nextUrl.searchParams.get("p");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const allMessages = await getMessages(chatId);
  const totalMessages = allMessages.length;
  const totalPages = Math.ceil(totalMessages / PAGE_SIZE);

  const endIndex = totalMessages - (page - 1) * PAGE_SIZE;
  const startIndex = Math.max(0, endIndex - PAGE_SIZE);

  const messages = allMessages.slice(startIndex, endIndex);
  const hasMore = page < totalPages;

  return NextResponse.json({
    messages,
    pagination: {
      pageSize: PAGE_SIZE,
      totalMessages,
      hasMore,
    },
  });
}
