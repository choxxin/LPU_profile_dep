import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { getProfileByRegistrationNumber } from "../umsinfo";

export async function POST(req) {
  const { reg_no } = await req.json();

  try {
    await connectToDB();

    const profile = await getProfileByRegistrationNumber(reg_no);
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ message: "Error getting profile" });
  }
}
