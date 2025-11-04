import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <div className='p-20'>
        <p className="text-7xl font-inter font-bold text-darkViolet">ELC PORTAL</p>
      </div>

      <div className='text-[1.4rem] w-[358px] h-[67px]'>
        <button
          className="text-darkViolet hover:text-violet bg-violet hover:bg-darkViolet w-full h-16 rounded-full font-bold text-2xl border transition duration-300"
          onClick={() => navigate("/register")}
        >
          GET STARTED
        </button>
      </div>

      <div className='mt-6 flex items-center justify-center gap-2 font-inter font-medium'>
        <p className='text-gray-800'>Already have an account?</p>
        <p className='text-darkViolet cursor-pointer' onClick={() => navigate('/login')}>Log In</p>
      </div>
    </div>
  )
}

export default Home