// backend/professorRoutes.js
import express from 'express';
import { professorDashboardData } from './mockDb.js'; 

const router = express.Router();

// GET professor dashboard data
// In a real app, the ID would come from the authenticated user token
router.get('/dashboard/:professorId', (req, res) => {
  const { professorId } = req.params;
  const data = professorDashboardData[professorId];

  if (data) {
    res.json(data);
  } else {
    // Return a default structure if ID is not found
    res.status(404).json({ 
        message: 'Professor not found or no dashboard data available',
        stats: { activeProjects: 0, totalApplications: 0, studentsMentored: 0 },
        projects: []
    });
  }
});

// GET all applicants for a specific project (View Application Page)
router.get('/project/:projectId/applications', (req, res) => {
    const { projectId } = req.params;
    
    // 1. Filter applications for the project ID
    const projectApplications = applications.filter(a => a.projectId === projectId);
    
    // 2. Augment applications with student profile data
    const detailedApplications = projectApplications.map(app => {
        const student = students.find(s => s._id === app.studentId);
        return {
            ...app,
            studentName: student ? student.name : 'Unknown Student',
            studentSkills: student ? student.skills : [],
            // In a real app, you would ONLY send a link, not the whole file
            resumeLink: student ? student.resume : null 
        };
    });

    res.json(detailedApplications);
});

export default router;
