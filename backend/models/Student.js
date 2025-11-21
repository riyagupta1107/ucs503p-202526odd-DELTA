import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  firstname: String,
  lastname: String,
  gender: String,
  email: String,
  phone: String,
  branch: String,
  resumeUrl: String, // path to uploaded resume
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);