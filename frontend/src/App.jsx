// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import './App.css'; // Add some basic styles

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h1>Research Projects Portal</h1>
        <Routes>
          <Route path="/" element={<ProjectListPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;