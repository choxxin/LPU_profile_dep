import Profile from "@/models/profile";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectToDB();
    const topProfiles = await Profile.find({})
      .populate("user", "name registrationNumber profile_image hide")
      .sort({ cgpa: -1 })
      .limit(20)
      .exec();

    const leaderboard = topProfiles.map((profile) => ({
      name: profile.user.name,
      registrationNumber: profile.user.registrationNumber,
      profileImage: profile.user.profile_image,
      cgpa: profile.cgpa,
      hide: profile.user.hide,
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
