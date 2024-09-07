import { connectToDB } from "../../../../../utils/database"; // Adjust the import path as needed
import Conversation from "../../../../../models/Conversation"; // Adjust the import path as needed
import Message from "../../../../../models/Message"; // Adjust the import path as needed

export async function POST(request) {
  try {
    await connectToDB(); // Ensure you're connected to the database

    const { message, senderId } = await request.json(); // Extract data from the request body
    const url = new URL(request.url); // Create URL object from the request URL
    const receiverId = url.pathname.split("/").pop(); // Extract receiverId from the URL

    if (!senderId) {
      return new Response(JSON.stringify({ error: "Sender ID is required" }), {
        status: 400,
      });
    }

    // Find or create a conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
      isGroupChat: false,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save both the conversation and the new message simultaneously
    await Promise.all([conversation.save(), newMessage.save()]);

    return new Response(JSON.stringify(newMessage), { status: 201 });
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    return new Response(JSON.stringify({ error: "Error sending message" }), {
      status: 500,
    });
  }
}
