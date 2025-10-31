// src/pages/ProjectDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProjectDetailPage() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Gets the :id from the URL

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) return <p>Loading project details...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="project-detail">
      <Link to="/">&larr; Back to all projects</Link>
      <h2>{project.title}</h2>
      <h3>Professor: {project.professor}</h3>
      <p>{project.description}</p>
      
      <h4>Prerequisites:</h4>
      <ul>
        {project.prerequisites.map(prereq => (
          <li key={prereq}>{prereq}</li>
        ))}
      </ul>
      
      <button className="btn btn-primary">Apply Now</button>
    </div>
  );
}

export default ProjectDetailPage;