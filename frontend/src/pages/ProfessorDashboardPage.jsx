// src/pages/ProfessorDashboardPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import QuickStatsCard from '../components/QuickStatsCard';
import ProfessorProjectCard from '../components/ProfessorProjectCard'; // For displaying professor's own projects

function ProfessorDashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    projects: [],
    stats: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // NOTE: In a real app, you'd send a token for authentication.
    // For this mock, we'll fetch data for a 'mocked' Professor ID (e.g., 'prof123').
    const fetchDashboardData = async () => {
      try {
        // New API route for professor-specific data
        const response = await axios.get('/api/professor/dashboard/prof123');
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching professor dashboard data:", error);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="professor-dashboard container">
        <p>Loading Professor Dashboard...</p>
      </div>
    );
  }

  const { projects, stats } = dashboardData;

  return (
    <div className="professor-dashboard container">
      <h2>Professor Dashboard</h2>
      
      {/* 1. Quick Stats Section */}
      <div className="quick-stats-grid">
        <QuickStatsCard title="Active Projects" value={stats.activeProjects || 0} />
        <QuickStatsCard title="Total Applications" value={stats.totalApplications || 0} />
        <QuickStatsCard title="Students Mentored" value={stats.studentsMentored || 0} />
      </div>

      <div className="dashboard-header">
        {/* 2. My Projects Overview */}
        <h3>My Projects Overview ({projects.length})</h3>
        
        {/* 3. Create New Project Button */}
        {/* This link would go to a project creation form page */}
        <Link to="/professor/project/new" className="btn btn-primary">
          + Create New Project
        </Link>
      </div>

      <div className="my-projects-list">
        {projects.length > 0 ? (
          projects.map(project => (
            // A specialized card for the professor's view (e.g., showing application count)
            <ProfessorProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p>You currently do not have any active projects. Use the button above to create one!</p>
        )}
      </div>
    </div>
  );
}

export default ProfessorDashboardPage;