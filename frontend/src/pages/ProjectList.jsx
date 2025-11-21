// src/pages/ProjectListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard2 from '../components/ProjectCard2';
import NavBar from '../components/NavBar';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchType, setSearchType] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch projects from our backend API
    const fetchProjects = async () => {
      try {
        // This will automatically point to your /api/projects route
        const response = await axios.get('http://localhost:5000/api/projects');
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

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
  
    if (searchType === "title") {
      return project.title.toLowerCase().includes(query);
    }
  
    if (searchType === "professorName") {
      return project.professorName?.toLowerCase().includes(query);
    }
  
    if (searchType === "prerequisites") {
      return project.prerequisites?.some((p) =>
        p.toLowerCase().includes(query)
      );
    }
  
    return true;
  });
  

  return (
    
    <div className="p-2 flex flex-col gap-10">
      <NavBar />
      <div className="flex gap-4 items-center p-4">
        {/* Dropdown */}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="title">Title</option>
          <option value="professorName">Professor</option>
          <option value="prerequisites">Prerequisites</option>
        </select>

        {/* Text search bar */}
        <input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg flex-grow"
        />
      </div>

      {filteredProjects.map(project => (
        <ProjectCard2 key={project._id} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;