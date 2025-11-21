import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    pid: { type: String, required: true }, // professor's pid
    professorName: String,
    title: String,
    description: String,
    prerequisites: [String],
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
