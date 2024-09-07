import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { GetCourses } from "../umsinfo";

export async function POST(req) {
  const { reg_no } = await req.json();

  try {
    await connectToDB();

    const profile = await GetCourses(reg_no);
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ message: "Error getting profile" });
  }
}
