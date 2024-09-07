// /pages/api/updateAvatar.js

import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { updateUserAvatar } from "../umsinfo"; // Utility function to update avatar

export async function POST(req) {
  try {
    // Parse the incoming JSON request
    const { reg_no, avatar } = await req.json();

    // Connect to the database
    await connectToDB();

    // Update the avatar in the database using your utility function
    const updatedUser = await updateUserAvatar(reg_no, avatar);

    if (!updatedUser) {
      throw new Error("User not found or failed to update avatar");
    }

    // Return a success response
    return NextResponse.json({ message: "Avatar updated successfully" });
  } catch (error) {
    console.error("Error updating avatar:", error);
    return NextResponse.json({
      message: "Failed to update avatar",
      error: error.message,
    });
  }
}
