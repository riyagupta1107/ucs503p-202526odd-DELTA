// backend/routes/studentRoutes.js
import express from "express";
import Application from "../models/Application.js";
import Project from "../models/Project.js";
import Student from "../models/Student.js";

const router = express.Router();

// GET /api/student/:rollNo/applications
router.get("/:rollNo/applications", async (req, res) => {
  try {
    const { rollNo } = req.params;

    // 1️⃣ Find the actual student document
    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.json([]);
    }

    // 2️⃣ Fetch all applications for this student
    const apps = await Application.find({ student: student._id }).populate("project");

    // 3️⃣ Final clean response
    const formatted = apps.map(a => ({
      applicationId: a._id,
      status: a.status,
      appliedAt: a.appliedAt,
      project: a.project
    }));

    res.json(formatted);

  } catch (err) {
    console.error("Student applications error:", err);
    res.status(500).json({ error: "Failed to load student applications" });
  }
});

export default router;
