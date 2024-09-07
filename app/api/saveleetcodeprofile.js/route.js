import { connectToDB } from "../../../utils/database";
import User from "@/models/user";

export async function POST(request) {
  await connectToDB();

  const { username, reg_no } = await request.json();

  if (!username || !reg_no) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Username and registration number are required",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const user = await User.findOneAndUpdate(
      { registrationNumber: reg_no },
      { leetcode_username: username },
      { new: true, upsert: true }
    ).exec();

    const plainUser = user.toObject(); // Convert to plain object
    plainUser._id = plainUser._id.toString(); // Convert _id to string if necessary

    return new Response(JSON.stringify({ success: true, data: plainUser }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating LeetCode profile:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function OPTIONS() {
  return new Response(JSON.stringify({ success: true, message: "OK" }), {
    status: 200,
    headers: { Allow: "POST", "Content-Type": "application/json" },
  });
}
