import { handleleetcodeprofile } from "../umsinfo"; // Import your specific function
import { connectToDB } from "@/utils/database"; // Assuming you need to connect to a DB (if applicable)
import { NextResponse } from "next/server";

export async function POST(req) {
  // Parse the incoming JSON request body
  const { leetusername } = await req.json();

  try {
    // Optionally connect to the database (if necessary)
    await connectToDB();

    // Call the function to get the LeetCode profile details
    const leetcodeData = await handleleetcodeprofile(leetusername);

    // Return the fetched LeetCode profile data
    return NextResponse.json({
      message: "LeetCode profile fetched successfully",
      data: leetcodeData,
    });
  } catch (error) {
    // Return an error response
    return NextResponse.json({ message: "Error fetching LeetCode profile" });
  }
}
