// api/index.js
import express from 'express';
import cors from 'cors';
import { projects } from './db.js'; // Using our mock data

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allows your React app to talk to this API
app.use(express.json());

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