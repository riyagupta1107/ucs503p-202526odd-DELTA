// src/pages/Professor/ProfessorDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function ProfessorDashboard() {
  const [pid, setPid] = useState(null);
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    prerequisites: ""
  });

  const auth = getAuth();
  const db = getFirestore();

  // ---------------------------------------------------------
  // 🔹 FETCH PROFESSOR PID FROM FIRESTORE
  // ---------------------------------------------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setPid(null);
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          if (data.pid) {
            setPid(data.pid);
          } else {
            console.warn("No PID on Firestore user doc");
          }
        }
      } catch (err) {
        console.error("Error reading Firestore user:", err);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ---------------------------------------------------------
  // 🔹 LOAD PROJECTS FOR THIS PROFESSOR
  // ---------------------------------------------------------
  useEffect(() => {
    if (!pid) return;

    const loadProjects = async () => {
      try {
        const res = await axios.get(`/api/professor/${pid}/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error("Error loading projects:", err);
      }
    };

    loadProjects();
  }, [pid]);

  // ---------------------------------------------------------
  // 🔹 LOAD APPLICATIONS FOR A PROJECT
  // ---------------------------------------------------------
  const loadApplications = async (projectId) => {
    try {
      const res = await axios.get(`/api/professor/${pid}/projects/${projectId}/applications`);
      setApplications(res.data);
    } catch (err) {
      console.error("Error loading applications:", err);
    }
  };

  // ---------------------------------------------------------
  // 🔹 ACCEPT APPLICATION
  // ---------------------------------------------------------
  const acceptApplication = async (appId) => {
    try {
      await axios.post(`/api/professor/applications/${appId}/accept`);
      setApplications(prev =>
        prev.map(a => a._id === appId ? { ...a, status: "accepted" } : a)
      );
    } catch (err) {
      console.error("Accept error:", err);
    }
  };

  // ---------------------------------------------------------
  // 🔹 REJECT APPLICATION
  // ---------------------------------------------------------
  const rejectApplication = async (appId) => {
    try {
      await axios.post(`/api/professor/applications/${appId}/reject`);
      setApplications(prev =>
        prev.map(a => a._id === appId ? { ...a, status: "rejected" } : a)
      );
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  // ---------------------------------------------------------
  // 🔹 ADD NEW PROJECT
  // ---------------------------------------------------------
  const addProject = async () => {
    if (!pid) return alert("PID missing. Log in again.");

    if (!newProject.title.trim()) return alert("Project title is required");

    try {
      const res = await axios.post(`/api/professor/${pid}/projects`, {
        title: newProject.title,
        description: newProject.description,
        prerequisites: newProject.prerequisites.split(",").map(p => p.trim())
      });

      setProjects(prev => [res.data, ...prev]);
      setNewProject({ title: "", description: "", prerequisites: "" });

    } catch (err) {
      console.error("Add project error:", err);
    }
  };

  // ---------------------------------------------------------
  // 🔹 DELETE PROJECT
  // ---------------------------------------------------------
  const deleteProject = async (projectId) => {
    if (!pid) return;

    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`/api/professor/${pid}/projects/${projectId}`);
      setProjects(prev => prev.filter(p => p._id !== projectId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ---------------------------------------------------------
  // 🔹 UI
  // ---------------------------------------------------------
  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div>
      <NavBar />

      <div className="p-6">
        <h1 className="text-4xl font-bold mb-8">Professor Dashboard</h1>

        {!pid && (
          <div className="p-4 mb-6 bg-yellow-100 border rounded text-yellow-800">
            No PID found on your Firestore profile.  
            Make sure you registered as a professor.
          </div>
        )}

        {/* ---------------- ADD PROJECT ---------------- */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10 border">
          <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>

          <input className="border w-full p-3 rounded-lg mb-3" placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />

          <textarea className="border w-full p-3 rounded-lg mb-3" placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />

          <input className="border w-full p-3 rounded-lg mb-4" placeholder="Prerequisites (comma separated)"
            value={newProject.prerequisites}
            onChange={(e) => setNewProject({ ...newProject, prerequisites: e.target.value })}
          />

          <button onClick={addProject}
            className="bg-violet hover:bg-darkViolet text-white font-bold px-6 py-2 rounded-lg">
            Add Project
          </button>
        </div>

        {/* ---------------- PROJECT LIST ---------------- */}
        <div className="grid gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-white border rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Professor: {project.professorName}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    className="bg-darkViolet text-white px-4 py-2 rounded-lg"
                    onClick={() => loadApplications(project._id)}
                  >
                    View Applications
                  </button>

                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => deleteProject(project._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- APPLICATIONS PANEL ---------------- */}
        {applications.length > 0 && (
          <div className="mt-10 bg-white p-6 rounded-2xl shadow-md border">
            <h2 className="text-2xl font-bold mb-4">Applications</h2>

            {applications.map(app => (
              <div key={app._id} className="p-4 border rounded-lg mb-3 flex justify-between">
                <div>
                  <p className="font-bold">{app.student.firstname} {app.student.lastname}</p>
                  <p className="text-sm text-gray-600">{app.student.email}</p>
                  <p>Status: <span className="font-semibold">{app.status}</span></p>
                </div>

                <div className="flex gap-3 items-center">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => acceptApplication(app._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => rejectApplication(app._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ProfessorDashboard;
