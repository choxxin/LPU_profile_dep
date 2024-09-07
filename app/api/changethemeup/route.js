// /pages/api/changeTheme.js

import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { changethemeup } from "../umsinfo"; // Utility function to update theme

export async function POST(req) {
  try {
    // Parse the incoming JSON request
    const { reg_no, color } = await req.json();

    // Connect to the database
    await connectToDB();

    // Update the theme color in the database
    const result = await changethemeup(reg_no, color);

    if (!result) {
      throw new Error("User not found or failed to update theme");
    }

    // Return a success response
    return NextResponse.json({ message: "Theme updated successfully" });
  } catch (error) {
    console.error("Error updating theme:", error);
    return NextResponse.json({
      message: "Failed to update theme",
      error: error.message,
    });
  }
}
