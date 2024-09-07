import { getRecentChats } from "@/utils/getRecentchats"; // Import your utility function
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract userId from the URL
    const { searchParams, pathname } = new URL(req.url);
    const userId = pathname.split("/").pop(); // Make sure this is the expected way to extract userId
    console.log(`Fetching recent chats for userId: ${userId}`);

    // Validate if userId exists
    if (!userId) {
      return NextResponse.json(
        { error: "User ID not provided" },
        { status: 400 } // 400 for bad request
      );
    }

    // Fetch recent chats
    const recentChats = await getRecentChats(userId);
    return NextResponse.json(recentChats);
  } catch (error) {
    // Log error for debugging purposes
    console.error("Error fetching recent chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent chats" },
      { status: 500 }
    );
  }
}
