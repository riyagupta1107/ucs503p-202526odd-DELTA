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
    <div className="form-container">
      <h2 className="form-title">Apply for Research Project</h2>

      <form onSubmit={handleSubmit} className="styled-form">

        <div className="form-group">
          <label>Name</label>
          <input name="name" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Roll Number</label>
          <input name="rollNumber" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" required onChange={handleChange}>
            <option value="">Select...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Accommodation Required</label>
          <select name="accommodation" required onChange={handleChange}>
            <option value="">Select...</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Branch</label>
          <input name="branch" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Year</label>
          <input name="year" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Resume (PDF)</label>
          <input type="file" accept=".pdf" name="resume" required onChange={handleChange} />
        </div>

        <button className="btn btn-primary submit-btn">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplyPage;
