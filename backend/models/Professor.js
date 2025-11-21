import mongoose from "mongoose";

const professorSchema = new mongoose.Schema({
  pid: { type: String, required: true, unique: true }, // e.g. "p001"
  firstname: String,
  lastname: String,
  email: String,
}, { timestamps: true });

export default mongoose.model("Professor", professorSchema);
