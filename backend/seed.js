// src/seed.js
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import Professor from "./models/Professor.js";
import Project from "./models/Project.js";

dotenv.config();

await connectDB();

async function seed() {
  const prof = await Professor.findOneAndUpdate(
    { pid: "p001" },
    { pid: "p001", firstname: "Rahul", lastname: "Sharma", email: "rahul@uni.edu" },
    { upsert: true, new: true }
  );

  const proj = await Project.findOneAndUpdate(
    { title: "Smart Energy Tracker" },
    { title: "Smart Energy Tracker", description: "An AI energy-saving tool", prerequisites: "React, Python basics", pid: prof.pid },
    { upsert: true, new: true }
  );

  console.log("Seeded:", prof, proj);
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
