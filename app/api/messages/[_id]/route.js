import { connectToDB } from "@/utils/database";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";

export async function POST(request) {
  try {
    await connectToDB();

    const body = await request.json();
    const senderId = body.senderId;

    const url = new URL(request.url);
    const receiverId = url.pathname.split("/").pop();
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    if (!senderId || !receiverId) {
      return new Response(
        JSON.stringify({ error: "Sender ID and Receiver ID are required" }),
        { status: 400 }
      );
    }

    // Find or create the conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
      isGroupChat: false,
    }).populate("messages");

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Retrieve messages from the conversation
    const messages = conversation.messages;

    // Update unseen messages for the receiver
    await Message.updateMany(
      { senderId: receiverId, receiverId: senderId, isSeen: false },
      { $set: { isSeen: true } }
    );

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (err) {
    console.error("Error in handling message:", err);
    return new Response(
      JSON.stringify({
        error: "Error in receive Message controller",
        details: err.message,
      }),
      { status: 500 }
    );
  }
}
