import { connectToDB } from "@/utils/database";
import Exam from "@/models/Exams";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const { reg_no } = await req.json();

    const exams = await Exam.find({ reg_no: reg_no });
    return NextResponse.json(exams);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
