import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function MainLayout() {
  return (
    <>
      <NavBar />
      
      {/* This div is the same as your "container" div in App.js.
        The pt-[80px] is only needed if you made your navbar "fixed"
        like we discussed. If not, you can remove pt-[80px].
      */}
      <div className="container pt-[80px]">
        <h1>Research Projects Portal</h1>
        
        {/* <Outlet /> renders the specific page for the route */}
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;