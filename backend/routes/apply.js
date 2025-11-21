import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs"; // 👈 CRITICAL FIX: Import fs

import Student from "../models/Student.js";
import Project from "../models/Project.js";
import Application from "../models/Application.js";
import { appendToSheet } from "../googleSheets.js";

const router = express.Router();

// ---------------------------------------------------------
// 1. Ensure 'uploads' directory exists
// ---------------------------------------------------------
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ---------------------------------------------------------
// 2. Configure Multer
// ---------------------------------------------------------
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir), // Use the variable
  filename: (_, file, cb) => {
    // Unique filename to prevent overwrites
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ storage });

// █████ POST /api/apply █████
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    console.log("Received Application Request");

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

    if (!rollNumber) {
      return res.status(400).json({ error: "rollNumber is missing" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({ error: "Project not found ❌" });
    }

    // Split name into first + last
    const nameParts = name.trim().split(" ");
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ");

    // ---------------------------------------------------------
    // 3. Save to MongoDB (Student & Application)
    // ---------------------------------------------------------
    const studentUpdate = {
      rollNo: rollNumber,
      firstname,
      lastname,
      email,
      ...(gender && { gender }),
      ...(phone && { phone }),
      ...(branch && { branch }),
    };

    if (req.file) {
      studentUpdate.resumeUrl = `/uploads/${req.file.filename}`;
    }

    const student = await Student.findOneAndUpdate(
      { rollNo: rollNumber },
      studentUpdate,
      { upsert: true, new: true }
    );

    const application = await Application.create({
      student: student._id,
      project: project._id,
      accommodation,
      status: "pending"
    });

    // ---------------------------------------------------------
    // 4. Append to Google Sheet (Safe Mode)
    // ---------------------------------------------------------
    // We use try-catch here so if Sheets fails (due to missing creds on Render),
    // the user still gets a "Success" message for the database part.
    try {
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
    } catch (sheetErr) {
      console.error("⚠️ Google Sheets Error (Ignored):", sheetErr.message);
      // Do NOT res.status(500) here. We want to continue.
    }

    // ---------------------------------------------------------
    // 5. Send Success Response
    // ---------------------------------------------------------
    res.json({
      message: "Application saved successfully",
      applicationId: application._id
    });

  } catch (error) {
    console.error("Apply Route Fatal Error:", error);
    res.status(500).json({
      error: "Something went wrong while processing application",
      details: error.message
    });
  }
});

export default router;