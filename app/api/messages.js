// import Conversation from "../../models/Conversation";
// import Message from "../../models/Conversation";
// const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params; //Getting the id form site frontend
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//       isGroupChat: false,
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//     }
//     //SOCKET IO

//     // await conversation.save();
//     // await newMessage.save();
//     //BOTH WORKS AT THE SAME TIME
//     await Promise.all([conversation.save(), newMessage.save()]);

//     // const receiverSocketId = getReceiverSocketId(receiverId);

//     // if (receiverSocketId) {
//     //   io.to(receiverSocketId).emit("newMessage", newMessage);
//     // }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: "error in send Message controller" });
//   }
// };
// const getMessage = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;

//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId] },
//       isGroupChat: false,
//     }).populate("messages"); //Not reference but actual messages
//     console.log("hello");
//     if (!conversation) return res.status(200).json([]); //if nothing show nothing

//     const messages = conversation.messages;
//     res.status(201).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "error in recive Message controller" });
//   }
// };

// const deleteChat = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;
//     let conversation;
//     if (userToChatId === "meow") {
//       conversation = await Conversation.findOne({ isGroupChat: true });
//     }
//     // Find the conversation between the two users
//     else {
//       conversation = await Conversation.findOne({
//         participants: { $all: [senderId, userToChatId] },
//         isGroupChat: false,
//       });
//     }

//     if (!conversation) {
//       return res.status(404).json({ error: "Conversation not found" });
//     }

//     // Delete all messages associated with the conversation
//     await Message.deleteMany({
//       _id: { $in: conversation.messages },
//     });

//     // Optionally, delete the conversation itself
//     await Conversation.deleteOne({
//       _id: conversation._id,
//     });

//     res.status(200).json({ message: "Chat deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error in deleteChat controller" });
//   }
// };
// export { sendMessage, getMessage, deleteChat };
