import Profile from "@/models/profile";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDB();

  try {
    const topProfiles = await Profile.find({})
      .populate("user", "name registrationNumber profile_image")
      .sort({ cgpa: -1 })
      .limit(10)
      .exec();

    const leaderboard = topProfiles.map((profile) => ({
      name: profile.user.name,
      registrationNumber: profile.user.registrationNumber,
      profileImage: profile.user.profile_image,
      cgpa: profile.cgpa,
    }));

    return NextResponse.json({ success: true, data: leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
