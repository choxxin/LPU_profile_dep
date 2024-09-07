import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import Comment from "@/models/comment";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const promptId = url.pathname.split("/").pop();

    const { userId, comment, userDp, userName } = await req.json();
    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    // Create a new comment
    // console.log(userId, comment, userDp, userName, promptId);
    const newComment = new Comment({
      userId,

      comment,
      userDp,
      userName,
    });

    await newComment.save();

    // if (!Array.isArray(prompt.comments)) {
    //   prompt.comments = [];
    // }
    prompt.comments.push(newComment._id);
    await prompt.save();

    // Return success response
    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to add comment",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
