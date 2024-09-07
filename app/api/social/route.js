import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDB();

  try {
    const { senderId, linkedin, instagram, github } = await req.json();
    const user = await User.findOne({ _id: senderId });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.linkedin = linkedin || user.linkedin;
    user.instagram = instagram || user.instagram;
    user.github = github || user.github;

    await user.save();

    return NextResponse.json(
      { message: "Social links updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
