import { connectToDB } from "../../../utils/database";
import { getalluser } from "../umsinfo"; // Function to get all users
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const users = await getalluser();

    // Create response object without custom headers
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    // Handle error case with a response
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
