import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import ProjectListPage from './pages/ProjectListPage';
import ProjectList from './pages/ProjectList.jsx';
import Home from './pages/Home.jsx';
import StudentDashboard from './pages/Student/StudentDashboard.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

import ProfessorDashboard from './pages/Professor/ProfessorDashboard.jsx';

import LoginPage from './pages/Authentication/LoginPage.jsx';
import RegisterPage from './pages/Authentication/RegisterPage.jsx';
import ApplyPage from './pages/Student/ApplyPage.jsx';

// Import Layout

import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectListPage />} /> 
          <Route path='/projects1' element={<ProjectList />} />
          <Route path='/profile' element={<ProfilePage />} />
          
          <Route path="/apply/:projectId" element={<ApplyPage />} />
          
          {/* --- STUDENT PAGES (AFTER LOGIN) --- */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          {/* --- PROFESSOR PAGES (AFTER LOGIN) --- */}
          <Route path="/professor/dashboard" element={<ProfessorDashboard />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
