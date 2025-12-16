import { NextRequest, NextResponse } from "next/server";
import { getChats } from "@/shared/db";

const PAGE_SIZE = 10;
export async function GET(req: NextRequest) {
  try {
    const pageParam = req.nextUrl.searchParams.get("p");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const allChats = await getChats();
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedChats = allChats.slice(startIndex, endIndex);
    const totalChats = allChats.length;
    const totalPages = Math.ceil(totalChats / PAGE_SIZE);
    const hasMore = page < totalPages;

    return NextResponse.json({
      chats: paginatedChats,
      pagination: {
        pageSize: PAGE_SIZE,
        totalPages,
        totalChats,
        hasMore,
      },
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}
