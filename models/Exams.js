import { Schema, model, models } from "mongoose";

const ExamSchema = new Schema(
  {
    reg_no: {
      type: String,
      required: true,
    },
    course_code: {
      type: String,
    },
    exam_type: {
      type: String,
    },
    course_name: {
      type: String,
    },
    room_no: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);
const Exam = models.Exam || model("Exam", ExamSchema);
export default Exam;
