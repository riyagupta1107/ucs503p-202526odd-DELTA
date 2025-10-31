// src/pages/ProjectListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';

function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from our backend API
    const fetchProjects = async () => {
      try {
        // This will automatically point to your /api/projects route
        const response = await axios.get('/api/projects');
        console.log('Data received from API:', response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  // TODO: Add Search Bar and Filtering logic here

  return (
    <div className="project-list">
      <h2>Available Projects</h2>
      {projects.map(project => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}

export default ProjectListPage;