// pages/api/userDetails.js
import { getUserDetails } from "../umsinfo"; // Import server-side logic
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
export async function POST(req) {
  const { reg_no, password, cookie } = await req.json();

  try {
    await connectToDB();
    const userDetails = await getUserDetails(reg_no, password, cookie);
    return NextResponse.json(userDetails);
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Failed to fetch user details" });
  }
}
