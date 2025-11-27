import { NextResponse } from "next/server";
import { getMockChats } from "@/widgets/chats/lib";

// GET /api/mock/chats
// Returns all chats (mock data)
// Later: Replace with real database query
export async function GET() {
  try {
    const chats = getMockChats();
    return NextResponse.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}
