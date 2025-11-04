// src/components/ProfessorProjectCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function ProfessorProjectCard({ project }) {
  const { _id, title, status, applicationCount } = project;

  return (
    <div className="project-card professor-card">
      <div className="card-info">
        <h3>{title}</h3>
        <p>Status: <span className={`status-${status.toLowerCase()}`}>{status}</span></p>
        <p>Applications: <strong>{applicationCount}</strong></p>
      </div>
      <div className="card-actions">
        <Link to={`/professor/project/edit/${_id}`} className="btn">
          Manage Project
        </Link>
      </div>
    </div>
  );
}

export default ProfessorProjectCard;