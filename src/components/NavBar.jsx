import React from 'react'

function NavBar() {
  return (
    <nav className='flex justify-around px-8 py-6 h-[80px] bg-white shadow-md'>
        <div className='text-2xl font-bold'>ELC Portal</div>
        <div className='flex justify-around w-[60%] font-semibold text-xl'>
            <a href=''>Projects</a>
            <a href=''>Researchers</a>
            <a href=''>Events</a>
            <a href=''>My Account</a>
        </div>
    </nav>
  )
}

export default NavBar