// src/components/ProjectCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>Professor: {project.professor}</p>
      <Link to={`/project/${project._id}`} className="btn">
        View Details
      </Link>
    </div>
  );
}

export default ProjectCard;