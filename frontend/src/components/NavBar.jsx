// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  // NOTE: This mock logic must be replaced with real state management later.
  const isLoggedIn = true; // Set to true to see the dashboard links
  const userRole = 'Student'; // Toggle between 'Student' and 'Professor' to test
  // const userRole = 'Student'; 

  const baseLinkClasses = 'text-gray-600 hover:text-blue-600 transition duration-300';
  const buttonClasses = 'px-4 py-2 text-white rounded-lg transition duration-300 shadow-md';

  return (
    <nav className='flex justify-between items-center px-8 py-4 h-[80px] bg-white shadow-md'>
      
      {/* 1. Logo/Home Link (Always visible, links to public projects) */}
      <Link to="/" className='text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300'>
        ELC Portal
      </Link>
      
      {/* 2. Main Navigation Links */}
      <div className='flex items-center space-x-6 font-semibold text-xl'>
        
        {/* PUBLIC LINKS (Always Visible) */}
        <Link to="/" className={baseLinkClasses}>Projects</Link>
        <Link to="/researchers" className={baseLinkClasses}>Researchers</Link>
        <Link to="/events" className={baseLinkClasses}>Events</Link>

        {/* --- DYNAMIC ROLE-SPECIFIC LINKS --- */}
        
        {/* 2A. Links for Professors */}
        {isLoggedIn && userRole === 'Professor' && (
            <>
                <Link to="/professor/dashboard" className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md'>
                    Dashboard
                </Link>
                {/* Secondary Professor links can be nested under the dashboard */}
            </>
        )}
        
        {/* 2B. Links for Students */}
        {isLoggedIn && userRole === 'Student' && (
            <>
                <Link to="/student/dashboard" className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-md'>
                    Dashboard
                </Link>
                {/* Adding specific student pages for direct access */}
                <Link to="/student/applications" className={baseLinkClasses}>
                    My Applications
                </Link>
                <Link to="/student/profile" className={baseLinkClasses}>
                    Profile
                </Link>
            </>
        )}

        {/* 3. Authentication/Profile Link */}
        {isLoggedIn ? (
            // If logged in, show a generic profile link (or button to trigger logout)
            <Link to={userRole === 'Student' ? "/student/profile" : "/professor/profile"} className='ml-4 text-sm px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300'>
                My Account
            </Link>
        ) : (
            // If logged out, show Login button
            <Link 
                to="/login" 
                className='ml-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300'
            >
                Login
            </Link>
        )}
        
      </div>
    </nav>
  )
}

export default NavBar;