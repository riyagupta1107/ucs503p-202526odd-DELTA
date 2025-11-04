import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import ProjectListPage from './pages/ProjectListPage';
import Home from './pages/Home.jsx';
import ProfessorDashboardPage from './pages/ProfessorDashboardPage'; 
import StudentDashboardPage from './pages/StudentDashboardPage.jsx';
import MyApplicationsPage from './pages/MyApplicationsPage.jsx';
import StudentProfilePage from './pages/StudentProfilePage.jsx';
import ViewApplicationPage from './pages/ViewApplicationPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ApplyPage from './pages/ApplyPage.jsx';

// Import Layout

import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectListPage />} /> {/* Added this since you had it before */}
          
          <Route path="/apply/:projectId" element={<ApplyPage />} />
          
          {/* --- STUDENT PAGES (AFTER LOGIN) --- */}
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/applications" element={<MyApplicationsPage />} />
          <Route path="/student/profile" element={<StudentProfilePage />} />
          
          {/* --- PROFESSOR PAGES (AFTER LOGIN) --- */}
          <Route path="/professor/dashboard" element={<ProfessorDashboardPage />} />
          <Route path="/professor/project/:projectId/applications" element={<ViewApplicationPage />} />
          <Route path="/professor/project/new" element={<h2>Create New Project Form</h2>} />
          <Route path="/professor/project/edit/:id" element={<h2>Edit Project Form</h2>} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
