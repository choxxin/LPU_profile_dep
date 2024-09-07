import { getRecentChats } from "@/utils/getRecentChats"; // Import your utility function
import { NextResponse } from "next/server";

export async function GET(req) {
  const { pathname } = req.nextUrl;

  const userId = pathname.split("/").pop();
  console.log(userId);
  try {
    const recentChats = await getRecentChats(userId);
    return NextResponse.json(recentChats);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recent chats" },
      { status: 500 }
    );
  }
}
