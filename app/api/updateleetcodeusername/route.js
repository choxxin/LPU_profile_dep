import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { updateLeetcodeUsername } from "../umsinfo"; // Utility function to update LeetCode username

export async function POST(req) {
  try {
    // Parse the incoming JSON request
    const { reg_no, username } = await req.json();

    // Connect to the database
    await connectToDB();

    // Update the LeetCode username in the database using your utility function
    const updatedUser = await updateLeetcodeUsername(reg_no, username);

    if (!updatedUser) {
      throw new Error("User not found or failed to update LeetCode username");
    }

    // Return a success response
    return NextResponse.json({
      message: "LeetCode username updated successfully",
    });
  } catch (error) {
    console.error("Error updating LeetCode username:", error);
    return NextResponse.json({
      message: "Failed to update LeetCode username",
      error: error.message,
    });
  }
}
