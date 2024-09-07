import { Schema, model, models } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    isGroupMessage: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    fullName: {
      type: String,
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  //Created and updated at
  { timestamps: true }
);

const Message = models.Message || model("Message", messageSchema);
export default Message;
