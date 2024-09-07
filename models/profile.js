import { Schema, model, models } from "mongoose";
// import User from "./user"; // Import the User model

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  program: {
    type: String,
  },
  section: {
    type: String,
  },
  cgpa: {
    type: String,
  },
  roll_number: {
    type: String,
  },
  agg_attendance: {
    type: String,
  },
});

const Profile = models.Profile || model("Profile", ProfileSchema);
export default Profile;
