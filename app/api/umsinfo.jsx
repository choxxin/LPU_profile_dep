"use server";
import axios from "axios";
import jwt from "jsonwebtoken";
import { connectToDB } from "../../utils/database";
import User from "../../models/user";
import Profile from "@/models/profile";
import Subject from "@/models/subjects";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_UMS_API_BASE_URL ||
  " http://localhost:8000/api/v1/user";

const SECRET_KEY = process.env.JWT_SECRET;
export const loginUser = async (reg_no, password, avatar) => {
  try {
    await connectToDB(); // Connect to the database

    // Make the login request to the API
    const response = await axios.post(`${API_BASE_URL}/login`, {
      reg_no,
      password,
    });

    // Check if the login was successful
    if (response.status === 200) {
      const { cookie } = response.data;

      // Check if the user already exists in the database
      let user = await User.findOne({ registrationNumber: reg_no });

      if (!user) {
        // If the user doesn't exist, create a new user in the database
        user = new User({
          profile_image: avatar,
          registrationNumber: reg_no,
          password: password, // Ideally, you should hash the password before saving it
          cookie: cookie,
        });
        await user.save(); // Save the user to the database
      } else {
        // If the user exists, update their cookie
        user.cookie = cookie;
        await user.save(); // Update the user in the database
      }

      // Generate a JWT token with the user's information
      const token = jwt.sign(
        {
          id: user._id,
          reg_no: user.registrationNumber,
        },
        SECRET_KEY,
        { expiresIn: "1h" } // Token expiration time
      );

      return { token, cookie }; // Return the token and cookie
    }

    throw new Error("Login failed");
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const getUserDetails = async (reg_no, password, cookie) => {
  try {
    // Find the user by registration number and password
    const user = await User.findOne({ registrationNumber: reg_no });

    if (!user) {
      throw new Error("User not found. Please log in first.");
    }
    if (!user.name || !user.profile_image) {
      // Fetch the user's name from the external API
      const response = await axios.post(`${API_BASE_URL}/me`, {
        reg_no,
        password,
        cookie,
      });

      const userData = response.data;

      // Update the user's name in the MongoDB
      user.name = userData.name; // Assuming the API returns the name

      await user.save(); // Save the updated user document
    }

    // Check if the profile exists in the database
    let userProfile = await Profile.findOne({ user: user._id })
      .populate("user")
      .lean();
    //lean helps to convert raw data in js obj

    if (!userProfile) {
      // If the profile doesn't exist, fetch the data from the API
      const response = await axios.post(`${API_BASE_URL}/me`, {
        reg_no,
        password,
        cookie,
      });

      const userData = response.data;

      // Create a new profile in the database
      userProfile = new Profile({
        user: user._id, // Reference the existing user
        program: userData.program,
        section: userData.section,
        cgpa: userData.cgpa,
        roll_number: userData.roll_number,
        agg_attendance: userData.agg_attendance,
      });

      await userProfile.save(); // Save the profile to the database
    }

    return userProfile; // Return the profile data
  } catch (error) {
    console.error("Get User Details Error:", error);
    throw error;
  }
};

export const handleleetcodeprofile = async (leetusername) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/${leetusername}/solved`
    );

    // Check if the user exists in the response
    if (response.data.matchedUser === null) {
      throw new Error("User does not exist.");
    }

    return response.data;
  } catch (error) {
    // Handle specific error messages
    if (error.response && error.response.data.errors) {
      const errors = error.response.data.errors;
      if (errors.some((err) => err.message.includes("user does not exist"))) {
        console.error("User Not Found Error:", error);
        throw new Error("User does not exist.");
      }
    }

    // Log and rethrow other errors
    console.error("Login Error:", error);
    throw error;
  }
};
export const getProfileByRegistrationNumber = async (registrationNumber) => {
  try {
    // Find the user by registration number
    const user = await User.findOne({ registrationNumber });

    if (!user) {
      throw new Error("User not found");
    }

    // Find the profile associated with the user
    const userProfile = await Profile.findOne({ user: user._id }).populate(
      "user"
    );
    console.log(userProfile);
    if (!userProfile) {
      throw new Error("Profile not found for the given registration number");
    }

    return JSON.parse(JSON.stringify(userProfile)); // Return the profile data
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
export const updateLeetcodeUsername = async (
  registrationNumber,
  newLeetcodeUsername
) => {
  try {
    // Validate inputs
    if (!registrationNumber || !newLeetcodeUsername) {
      throw new Error(
        "Registration number and new LeetCode username are required."
      );
    }

    // Find the user by registration number
    const user = await User.findOne({ registrationNumber });

    if (!user) {
      throw new Error("User not found.");
    }

    // Update the LeetCode username
    user.leetcode_username = newLeetcodeUsername;

    // Save the updated user object
    await user.save();

    // Return the updated user object
    return true;
  } catch (error) {
    console.error("Error updating LeetCode username:", error);
    return false;
    throw error;
  }
};
export const deleteUserAndProfile = async (registrationNumber) => {
  try {
    // Find the user by registration number
    const user = await User.findOne({ registrationNumber });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete the associated profile
    await Profile.findOneAndDelete({ user: user._id });

    // Delete the user
    await User.findOneAndDelete({ registrationNumber });

    return { message: "User and profile deleted successfully" };
  } catch (error) {
    console.error("Error deleting user and profile:", error);
    throw error;
  }
};
export const updateUserAvatar = async (registrationNumber, newAvatarUrl) => {
  try {
    // Find the user by registration number and update their profile image
    const updatedUser = await User.findOneAndUpdate(
      { registrationNumber },
      { profile_image: newAvatarUrl },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return { message: "User avatar updated successfully", user: updatedUser };
  } catch (error) {
    console.error("Error updating user avatar:", error);
    throw error;
  }
};

export const changethemeup = async (registrationNumber, themeup) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { registrationNumber },
      { themetop: themeup },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    // return updatedUser; // Return the updated user document
    return { message: "User themetop successfully", user: updatedUser };
  } catch (error) {
    console.error("Error updating top theme:", error);
    throw error; // Rethrow the error so it can be caught by the caller
  }
};

export const changethemedown = async (registrationNumber, themebot) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { registrationNumber },
      { themedown: themebot },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    // return updatedUser; // Return the updated user document
    return { message: "User themedown successfully", user: updatedUser };
  } catch (error) {
    console.error("Error updating down theme:", error);
    throw error; // Rethrow the error so it can be caught by the caller
  }
};
export const Update_course_detail = async (
  registrationNumber,
  password,
  cookie
) => {
  try {
    // Fetch course data from the API
    const response = await axios.post(
      "http://localhost:8000/api/v1/timetable/classes",
      {
        reg_no: registrationNumber,
        password,
        cookie,
      }
    );

    const facultyDetails = response.data.faculty_details;
    const courses = Object.keys(facultyDetails).map((courseCode) => {
      const facultyDetail = facultyDetails[courseCode];
      return {
        reg_no: registrationNumber, // Include the registration number
        course_code: courseCode || "Unknown Code",
        course_name: facultyDetail.course_title || "Unknown Course",
        facultyname: facultyDetail.faculty_name || "Unknown Faculty",
        credits: parseInt(facultyDetail.credits, 10) || 0,
      };
    });

    // Update or insert course details for the registration number
    for (const course of courses) {
      await Subject.findOneAndUpdate(
        { reg_no: registrationNumber, course_code: course.course_code },
        course,
        { upsert: true, new: true }
      );
    }

    return { message: "Courses updated successfully" };
  } catch (error) {
    console.error("Error updating course details:", error);
    throw error;
  }
};

export const GetCourses = async (registrationNumber) => {
  try {
    // Fetch courses for the given registration number
    const courses = await Subject.find({ reg_no: registrationNumber });

    if (!courses || courses.length === 0) {
      throw new Error("No courses found for the given registration number");
    }

    // Return the courses as a JSON object
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

const convertToPlainObject = (user) => {
  if (!user) return null;

  // Convert the user document to a plain object
  const plainUser = user.toObject({ getters: true, versionKey: false });

  // Convert the ObjectId fields to strings
  plainUser._id = plainUser._id.toString();

  if (plainUser.courses) {
    plainUser.courses = plainUser.courses.map((course) => {
      // Convert each course's _id to a string and remove other Mongoose fields
      return {
        ...course,
        _id: course._id.toString(),
      };
    });
  }

  return plainUser;
};
