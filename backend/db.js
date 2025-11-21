import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI missing in .env");
  }
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
}