import { connectToDB } from "../../../utils/database";
import User from "../../../models/user";

export async function POST(request) {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body to get the registration number
    const { registrationNumber } = await request.json();

    if (!registrationNumber) {
      return new Response(
        JSON.stringify({ message: "Registration number is required" }),
        {
          status: 400,
        }
      );
    }

    // Find the user with the given registration number
    const user = await User.findOne({ registrationNumber }).lean();

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Return the user's courses
    return new Response(JSON.stringify(user.courses), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
