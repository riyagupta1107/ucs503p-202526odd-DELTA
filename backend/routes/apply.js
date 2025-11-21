// backend/routes/apply.js
import express from "express";
import multer from "multer";
import path from "path";

import Student from "../models/Student.js";
import Project from "../models/Project.js";
import Application from "../models/Application.js";
import { appendToSheet } from "../googleSheets.js";

const router = express.Router();

// Multer for resume uploads
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads/"),
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// █████ POST /api/apply █████
router.post("/", upload.single("resume"), async (req, res) => {
  try {

    console.log("FULL BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      name,
      rollNumber,
      gender,
      accommodation,
      email,
      phone,
      branch,
      projectId
    } = req.body;

    if (!rollNumber) return res.status(400).json({ error: "rollNumber is missing" });

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({ error: "Project not found ❌" });
    }

    // Split name into first + last
    const nameParts = name.trim().split(" ");
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ");

    const student = await Student.findOneAndUpdate(
      { rollNo: rollNumber },
      {
        rollNo: rollNumber,
        firstname,
        lastname,
        gender,
        email,
        phone,
        branch,
        resumeUrl: req.file ? `/uploads/${req.file.filename}` : ""
      },
      { upsert: true, new: true }
    );

    const application = await Application.create({
      student: student._id,
      project: project._id,
      accommodation,
      status: "pending"
    });

    const row = [
      `${firstname} ${lastname}`,
      rollNumber,
      gender,
      email,
      phone,
      branch,
      req.file?.originalname || "No resume",
      new Date().toLocaleString(),
      application._id.toString()
    ];

    await appendToSheet(`Project_${projectId}`, row);

    // 5️⃣ Response
    res.json({
      message: "Application saved",
      applicationId: application._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong while processing application"
    });
  }
});

export default router;
