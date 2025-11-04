// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  // NOTE: This mock logic must be replaced with real state management later.
  const isLoggedIn = true; // Set to true to see the dashboard links
  const userRole = 'Student'; 

  const baseLinkClasses = 'text-lg text-darkViolet hover:text-violet transition duration-300 font-inter rounded-full p-3 w-full text-center bg-violet hover:bg-darkViolet';
  const buttonClasses = 'px-4 py-2 text-white rounded-lg transition duration-300 shadow-md font-inter';

  return (
    <nav className='flex justify-end items-center px-8 py-4 h-[80px]'>
      
      {/* 1. Logo/Home Link (Always visible, links to public projects) */}
      
      
      {/* 2. Main Navigation Links */}
      <div className='flex items-center space-x-6 font-semibold text-xl'>
      {isLoggedIn && userRole === 'Student' && (
            <>
                <Link to="/student/dashboard" className={baseLinkClasses}>
                    Home
                </Link>
            </>
        )}
        {/* PUBLIC LINKS (Always Visible) */}
        <Link to="/projects" className={baseLinkClasses}>Projects</Link>
        <Link to="/researchers" className={baseLinkClasses}>Researchers</Link>

        {/* --- DYNAMIC ROLE-SPECIFIC LINKS --- */}
        
        {/* 2A. Links for Professors */}
        
        
        {/* 2B. Links for Students */}
        

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