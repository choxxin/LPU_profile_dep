import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find().populate("creator");
    const reversedPrompts = prompts.reverse(); // Reverse the order of the prompts
    return new Response(JSON.stringify(reversedPrompts), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch prompts",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
