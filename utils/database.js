import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://kumaransh1975:eo2wwhzgsJ8dx9H3@cluster0.ppf9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};
