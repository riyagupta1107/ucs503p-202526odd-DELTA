// backend/routes/professorRoutes.js
import express from "express";
import Project from "../models/Project.js";
import Application from "../models/Application.js";
import Student from "../models/Student.js";
import Professor from "../models/Professor.js";

const router = express.Router();

// -------------------------------------------
// REGISTER PROFESSOR
// -------------------------------------------
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const count = await Professor.countDocuments();
    const pid = `p${String(count + 1).padStart(3, "0")}`;

    const prof = await Professor.create({
      pid,
      firstname: firstName,
      lastname: lastName,
      email
    });

    res.json(prof);

  } catch (err) {
    console.error("Professor register error:", err);
    res.status(500).json({ error: "Failed to create professor" });
  }
});

// -------------------------------------------
// GET ALL APPLICATIONS FOR A PROJECT
// -------------------------------------------
router.get("/:pid/projects/:projectId/applications", async (req, res) => {
  try {
    const { projectId } = req.params;

    const applications = await Application.find({ project: projectId })
      .populate("student");

    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// -------------------------------------------
// ACCEPT APPLICATION
// -------------------------------------------
router.post("/applications/:appId/accept", async (req, res) => {
  try {
    const { appId } = req.params;

    await Application.findByIdAndUpdate(appId, { status: "accepted" });

    res.json({ success: true });
  } catch (err) {
    console.error("Accept error:", err);
    res.status(500).json({ error: "Failed to accept application" });
  }
});

// -------------------------------------------
// REJECT APPLICATION
// -------------------------------------------
router.post("/applications/:appId/reject", async (req, res) => {
  try {
    const { appId } = req.params;

    await Application.findByIdAndUpdate(appId, { status: "rejected" });

    res.json({ success: true });
  } catch (err) {
    console.error("Reject error:", err);
    res.status(500).json({ error: "Failed to reject application" });
  }
});

// -------------------------------------------
// GET ALL PROJECTS OF A PROFESSOR
// -------------------------------------------
router.get("/:pid/projects", async (req, res) => {
  try {
    const { pid } = req.params;

    const projects = await Project.find({ pid });

    res.json(projects);
  } catch (err) {
    console.error("Fetch professor projects error:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// -------------------------------------------
// ADD A NEW PROJECT
// -------------------------------------------
router.post("/:pid/projects", async (req, res) => {
  try {
    const { pid } = req.params;
    const { title, description, prerequisites } = req.body;

    const prof = await Professor.findOne({ pid });

    const newProject = await Project.create({
      pid,
      professorName: `${prof.firstname} ${prof.lastname}`,
      title,
      description,
      prerequisites: prerequisites || []
    });

    res.json(newProject);
  } catch (err) {
    console.error("Add project error:", err);
    res.status(500).json({ error: "Failed to add project" });
  }
});

// -------------------------------------------
// DELETE PROJECT + APPLICATIONS
// -------------------------------------------
router.delete("/:pid/projects/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;

    await Project.findByIdAndDelete(projectId);
    await Application.deleteMany({ project: projectId });

    res.json({ success: true });

  } catch (err) {
    console.error("Delete project error:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
