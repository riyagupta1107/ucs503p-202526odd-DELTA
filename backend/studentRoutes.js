// backend/studentRoutes.js
import express from 'express';
import { students, applications, projects } from './mockDb.js';

const router = express.Router();

// Mock Student ID (In a real app, this comes from an auth token)
const MOCK_STUDENT_ID = "studentA"; 

// GET Student Dashboard Data (Profile Summary + Application Counts)
router.get('/dashboard', (req, res) => {
    // 1. Get profile data
    const student = students.find(s => s._id === MOCK_STUDENT_ID);

    // 2. Get applications for the student
    const studentApplications = applications.filter(a => a.studentId === MOCK_STUDENT_ID);

    // 3. Build a summary
    const dashboardData = {
        name: student.name,
        totalApplied: studentApplications.length,
        statusCounts: studentApplications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {})
    };

    res.json(dashboardData);
});


// GET Student's Applications History (My Applications Page)
router.get('/applications', (req, res) => {
    const studentApplications = applications.filter(a => a.studentId === MOCK_STUDENT_ID);

    // Join application data with project titles for the frontend display
    const detailedApplications = studentApplications.map(app => {
        const project = projects.find(p => p._id === app.projectId);
        return {
            ...app,
            projectTitle: project ? project.title : "Unknown Project"
        };
    });

    res.json(detailedApplications);
});

// GET Student Profile Data (Student Profile Page)
router.get('/profile', (req, res) => {
    const profile = students.find(s => s._id === MOCK_STUDENT_ID);
    if (profile) {
        res.json(profile);
    } else {
        res.status(404).json({ message: "Student profile not found." });
    }
});

// PUT/POST Update Student Profile (Student Profile Page)
router.put('/profile', (req, res) => {
    // Mock Update Logic: just return success
    res.json({ message: "Profile updated successfully.", profile: req.body });
});

export default router;