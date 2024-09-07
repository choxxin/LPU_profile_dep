import { connectToDB } from "../../../utils/database";
import User from "../../../models/user";

export async function GET(request) {
  try {
    await connectToDB();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
