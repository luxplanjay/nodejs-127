import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connection success");
  } catch (error) {
    console.log("❌ MongoDB connection error");
  }
};
