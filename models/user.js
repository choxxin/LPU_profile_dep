import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  profile_image: {
    type: String,
  },
  leetcode_username: {
    type: String,
  },
  registrationNumber: {
    type: String,
    required: [true, "Registration number is required"],
    unique: [true, "Registration number already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  cookie: {
    type: String, // Add this field if storing the cookie
  },
  themetop: {
    type: String, // Add this field if
    default: "gradient-profile",
  },
  themedown: {
    type: String, // Add this field if
    default: "gradient-profile",
  },
  linkedin: {
    type: String,
  },
  instagram: {
    type: String,
  },
  github: {
    type: String,
  },
  hide: {
    type: Boolean,
    default: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
