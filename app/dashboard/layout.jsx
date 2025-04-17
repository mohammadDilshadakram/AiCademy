'use client';

import React, { useState } from 'react';
import { SignIn } from '@clerk/nextjs';
import Sidebar from './_components/Sidebar';
import DashboardHeader from './_components/DashboardHeader';
import { CourseCountContext } from '../_context/CourseCountContext';

function DashboardLayout({ children }) {
  const [totalCourse, setTotalCourse] = useState(0);
  const [isSignInOpen, setSignInOpen] = useState(false);

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      <div>
        <div className='md:w-64 hidden md:block fixed'>
          <Sidebar />
        </div>
        <div className='md:ml-64'>
          <DashboardHeader />
            <div className={`p-10 ${isSignInOpen ? 'blur' : ''}`}>
            {children}
            <button onClick={() => setSignInOpen(true)} className="mt-4">
              Sign In
            </button>
            <SignIn
              open={isSignInOpen}
              onClose={() => setSignInOpen(false)}
              fallbackRedirectUrl="/dashboard"
            />
          </div>
        </div>
      </div>
    </CourseCountContext.Provider>
  );
}

export default DashboardLayout;
