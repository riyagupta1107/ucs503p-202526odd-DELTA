// backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from "./db.js";

import professorRoutes from "./routes/professorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import applyRoutes from "./routes/apply.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
await connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: [
    "http://localhost:5173",  // React dev server
    "http://localhost:3000",
    "https://ucs503p-202526odd-delta-59ezsvo1p-riya-guptas-projects-13223453.vercel.app"
  ],
  credentials: true
}));


app.use(express.json());

// --- API ROUTES ---

// Apply API (student application form)
app.use("/api/apply", applyRoutes);

// Projects API (MongoDB)
app.use("/api/projects", projectRoutes);

// Student routes
app.use("/api/student", studentRoutes);

// Professor routes
app.use("/api/professor", professorRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
