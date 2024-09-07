// /pages/api/deleteUserAndProfile.js

import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { deleteUserAndProfile } from "../umsinfo"; // Utility function to delete user and profile

export async function POST(req) {
  try {
    // Parse the incoming JSON request
    const { reg_no } = await req.json();

    // Connect to the database
    await connectToDB();

    // Delete the user and profile from the database
    const result = await deleteUserAndProfile(reg_no);

    if (!result) {
      throw new Error("User not found or failed to delete");
    }

    // Return a success response
    return NextResponse.json({
      message: "User and profile deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user and profile:", error);
    return NextResponse.json({
      message: "Failed to delete user and profile",
      error: error.message,
    });
  }
}
