import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  prompt: {
    type: String,
  },
  tag: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
const prompt = models.prompt || model("prompt", promptSchema);
export default prompt;
