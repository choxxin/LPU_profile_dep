import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import Comment from "@/models/comment";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const promptId = url.pathname.split("/").pop();

    const comments = await Prompt.findById(promptId).populate("comments");
    if (!comments) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(comments), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch comment",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
