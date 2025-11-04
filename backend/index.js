// backend/index.js
import express from 'express';
import cors from 'cors';
import { projects } from './db.js'; // Using our mock data
import professorRoutes from './professorRoutes.js';
import  studentRoutes  from './studentRoutes.js';
import applyRoutes from "./routes/apply.js";


const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://ucs503p-202526odd-delta-59ezsvo1p-riya-guptas-projects-13223453.vercel.app' 
}));

// Middleware
app.use(express.json());

app.use("/api", applyRoutes);


// --- API ROUTES ---

// GET all projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// GET a single project by ID
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p._id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// --- NEW Student API ROUTES ---
app.use('/api/student', studentRoutes); // 

// --- Existing Professor API ROUTES ---
app.use('/api/professor', professorRoutes);

// --- User/Admin Routes (To be added later) ---
// POST /api/projects (Admin only)
// PUT /api/projects/:id (Admin only)
// POST /api/projects/:id/apply (Student only)

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Export the app for Vercel
export default app;