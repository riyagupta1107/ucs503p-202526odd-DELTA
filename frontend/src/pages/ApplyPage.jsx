// src/pages/ApplyPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ApplyPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    gender: "",
    accommodation: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);
    data.append("projectId", projectId);

    try {
      await axios.post("http://localhost:3001/api/apply", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Application submitted successfully ✅");
      navigate("/");
    } catch (error) {
      alert("Failed to submit - try again");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-violet-50 to-violet-100 font-inter px-4">
      <div className="bg-white shadow-md border border-gray-100 rounded-2xl p-8 w-full max-w-2xl">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Apply for Research Project</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="form-group">
          <label className="block font-semibold text-gray-700 mb-1">Name</label>
          <input name="name" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-darkViolet outline-none" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Roll Number</label>
          <input name="rollNumber" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-darkViolet outline-none" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Gender</label>
          <select name="gender" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-darkViolet outline-none">
            <option value="">Select...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Accommodation Required</label>
          <select name="accommodation" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-darkViolet outline-none">
            <option value="">Select...</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email</label>
          <input type="email" name="email" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-darkViolet outline-none" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Phone</label>
          <input type="tel" name="phone" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-darkViolet outline-none" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Branch</label>
          <input name="branch" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-darkViolet outline-none" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Year</label>
          <input name="year" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-darkViolet outline-none" />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Resume (PDF)</label>
          <input type="file" accept=".pdf" name="resume" required onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-darkViolet outline-none mb-4" />
        </div>

        <button className="text-darkViolet hover:text-violet bg-violet hover:bg-darkViolet w-full h-14 rounded-xl shadow-md font-bold text-lg border border-gray-300 transition duration-300">Submit Application</button>
      </form>
      </div>
    </div>
  );
}

export default ApplyPage;
