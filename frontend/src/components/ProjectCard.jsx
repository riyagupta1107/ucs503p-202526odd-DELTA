import React from 'react';
import { Link } from 'react-router-dom';

// 1. We now accept a 'project' object as a prop.
function ProjectCard({ project }) {
  // 2. We can remove useState, useEffect, and useParams.
  // This component just needs to display the prop it's given.

  // 3. Check if a project was passed. If not, render nothing (or a placeholder).
  if (!project) {
    return null; 
  }

  // Define Tailwind classes for re-use
  const applyButtonClasses = 'font-bold text-darkViolet hover:text-violet transition duration-300 font-inter rounded-full p-3 w-full text-center bg-violet hover:bg-darkViolet font-inter';
  
  return (
    
    // Increased height to h-auto to fit new content, min-h-[200px]
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md font-inter p-8 flex flex-col justify-between min-h-[200px]">
      
      {/* --- Top Section (Title & Prof) --- */}
      <div>
        <h3 className='text-xl font-bold text-gray-800'>{project.title}</h3>
        <p className='text-lg text-gray-600 font-semibold mb-3'>
          Professor: {project.professorName}
        </p>
      </div>

      {/* --- Middle Section (Details) --- */}
      <div className='my-4'>
        {/* Description */}
        <p className='text-gray-700 text-md mb-3'>
          {project.description}
        </p>
        
        {/* Prerequisites */}
        {project.prerequisites && project.prerequisites.length > 0 && (
          <div>
            <h4 className='text-md font-semibold text-gray-800 mb-1'>Prerequisites:</h4>
            <ul className='list-disc list-inside pl-2 text-sm text-gray-600'>
              {project.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* --- Bottom Section (Button) --- */}
      {/* This replaces the "View Details" link */}
      <div className="mt-auto pt-4"> 
        <Link 
          to={`/apply/${project._id}`} 
          className={applyButtonClasses}
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
