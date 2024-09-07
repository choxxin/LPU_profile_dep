import { Schema, model, models } from "mongoose";
import User from "./user";

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
  },
  userDp: {
    type: String,
  },
  userName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = models.Comment || model("Comment", commentSchema);
export default Comment;
