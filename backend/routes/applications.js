// src/routes/applications.js
import express from "express";
import Application from "../models/Application.js";

const router = express.Router();

// PATCH /api/applications/:id/status
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["accepted","rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const updated = await Application.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

export default router;
