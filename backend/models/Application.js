import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  status: { type: String, enum: ["pending","accepted","rejected"], default: "pending" },
  accommodation: {type: String},
  appliedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
