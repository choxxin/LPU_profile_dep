import { connectToDB } from "../../../utils/database";
import User from "../../../models/user";

export async function GET(request) {
  try {
    await connectToDB();
    const users = await User.find();

    // Create response object and set headers for no caching
    const response = new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate", // Prevent caching
        Pragma: "no-cache", // HTTP 1.0
        Expires: "0", // Immediately expires
      },
    });

    return response;
  } catch (err) {
    // Handle error case with a response
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
