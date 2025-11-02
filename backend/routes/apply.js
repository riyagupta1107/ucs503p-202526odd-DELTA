import express from "express";
import multer from "multer";
import { appendToSheet } from "../googleSheets.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const sheetName = `Project_${req.body.projectId}`;

    const row = [
      req.body.name,
      req.body.rollNumber,
      req.body.gender,
      req.body.accommodation,
      req.body.email,
      req.body.phone,
      req.body.branch,
      req.body.year,
      req.file?.originalname || "N/A",
      new Date().toLocaleString(),
    ];

    await appendToSheet(sheetName, row);

    res.json({ message: "Application stored in Google Sheet ✅" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to store in Google Sheet ❌" });
  }
});

export default router;
