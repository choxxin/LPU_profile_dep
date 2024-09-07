import axios from "axios";
import Exam from "@/models/Exams";
import { connectToDB } from "@/utils/database";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse request body
    const { reg_no, password, cookie } = await req.json();

    // Connect to the database
    await connectToDB();

    // Step 1: Check if exams for the given reg_no are already in the database
    const existingExams = await Exam.find({ reg_no });

    // Step 2: Check if exams are older than 1 month or if they don't exist
    const oneMonthAgo = dayjs().subtract(1, "month");
    const isDataOldOrAbsent =
      existingExams.length === 0 ||
      dayjs(existingExams[0].createdAt).isBefore(oneMonthAgo);

    if (isDataOldOrAbsent) {
      // Step 3: Fetch updated exams from the external API
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/exams",
        {
          reg_no,
          password,
          cookie,
        }
      );

      const examData = response.data.exams;

      // Remove old exams if they exist
      if (existingExams.length > 0) {
        await Exam.deleteMany({ reg_no });
      }

      // Save the new exams to the database
      const savedExams = await Exam.insertMany(
        examData.map((exam) => ({
          reg_no,
          course_code: exam.course_code,
          course_name: exam.course_name,
          exam_type: exam.exam_type,
          room_no: exam.room_no,
          date: exam.date,
          time: exam.time,
        }))
      );

      // Step 4: Send the updated data as the response
      return NextResponse.json({ exams: savedExams });
    }

    // Step 5: Return existing exams if they are recent
    return NextResponse.json({ exams: existingExams });
  } catch (error) {
    console.error("Error:", error);
    // Return error with appropriate status code
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
