// pages/api/login.js
import { loginUser } from "../umsinfo"; // Import server-side logic

import { NextResponse } from "next/server"; // Import NextResponse

export async function POST(req) {
  const { reg_no, password, avatar } = await req.json(); // Extract data from request body

  try {
    // Connect to the database
    const loginData = await loginUser(reg_no, password, avatar);
    return NextResponse.json(loginData); // Respond with JSON data
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 }); // Respond with error and status
  }
}
