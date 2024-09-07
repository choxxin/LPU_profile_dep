import { Schema, model, models } from "mongoose";
// import User from "./user"; // Import the User model

const SubjectSchema = new Schema({
  reg_no: {
    type: String,
    required: true,
  },
  course_code: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  facultyname: {
    type: String,
  },
  credits: {
    type: Number,
    required: true,
  },
});

const Subject = models.Subject || model("Subject", SubjectSchema);
export default Subject;
