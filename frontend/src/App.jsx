// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
// Import the new Professor Dashboard page
import ProfessorDashboardPage from './pages/ProfessorDashboardPage'; 
import NavBar from './components/NavBar.jsx';
import StudentDashboardPage from './pages/StudentDashboardPage.jsx';
import MyApplicationsPage from './pages/MyApplicationsPage.jsx';
import StudentProfilePage from './pages/StudentProfilePage.jsx';
import ViewApplicationPage from './pages/ViewApplicationPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <div className="container">
        <h1>Research Projects Portal</h1>
        <Routes>
          {/* Public Routes (as before) */}
          <Route path="/" element={<ProjectListPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />

          {/* --- STUDENT PAGES (AFTER LOGIN) --- */}
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/applications" element={<MyApplicationsPage />} />
          <Route path="/student/profile" element={<StudentProfilePage />} />
          
          {/* --- PROFESSOR PAGES (AFTER LOGIN) --- */}
          <Route path="/professor/dashboard" element={<ProfessorDashboardPage />} />
          <Route path="/professor/project/:projectId/applications" element={<ViewApplicationPage />} />
          <Route path="/professor/project/new" element={<h2>Create New Project Form</h2>} />
          
          {/* Mock routes for new project/edit */}
          <Route path="/professor/project/new" element={<h2>Create New Project Form</h2>} />
          <Route path="/professor/project/edit/:id" element={<h2>Edit Project Form</h2>} />

          {/* --- AUTH PAGES (Optional for now) --- */}
          <Route path="/login" element={<h2>Login Page Component</h2>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;