// src/pages/ApplyPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function ApplyPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const [userData, setUserData] = useState(null);
  const [resume, setResume] = useState(null);
  const [accommodation, setAccommodation] = useState("");

  // Load Firestore user profile
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return navigate("/login");

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setUserData(snap.data());
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData) {
      alert("User data not loaded.");
      return;
    }

    const form = new FormData();
    form.append("name", `${userData.firstName} ${userData.lastName}`);
    form.append("rollNumber", userData.rollNo);
    form.append("email", userData.email);
    form.append("gender", userData.gender || "");
    form.append("phone", userData.phone || "");
    form.append("branch", userData.branch || "");
    form.append("accommodation", accommodation);
    form.append("projectId", projectId);
    form.append("resume", resume);

    try {
      await axios.post("/api/apply", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Application submitted successfully!");
      navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to submit application.");
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">

        <h2 className="text-3xl font-bold mb-6 text-center">Apply for Project</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Accommodation */}
          <div>
            <label className="font-semibold">Accommodation Required?</label>
            <select
              className="w-full border p-2 rounded"
              required
              onChange={(e) => setAccommodation(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Resume */}
          <div>
            <label className="font-semibold">Upload Resume (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              required
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full border p-2 rounded"
            />
          </div>

          <button className="w-full bg-purple-600 text-white p-3 rounded-lg font-bold">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyPage;
