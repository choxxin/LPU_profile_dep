import { Update_course_detail } from "../umsinfo";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { reg_no, password, cookie } = await req.json();

  try {
    await connectToDB();

    await Update_course_detail(reg_no, password, cookie);
    return NextResponse.json({
      message: "Course details updated successfully",
    });
  } catch (error) {
    return NextResponse.json({ message: "Error updating course details" });
  }
}
