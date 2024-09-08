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
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
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
