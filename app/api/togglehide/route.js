import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDB();

  try {
    const { SenderId } = await req.json(); // Parse the incoming request JSON
    const user = await User.findOne({ _id: SenderId });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Toggle the hide field
    user.hide = !user.hide;

    await user.save();

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
