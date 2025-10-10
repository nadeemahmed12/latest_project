import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FaUserCircle, FaKey } from 'react-icons/fa'; 

function AppLayout({ header = null }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  // New state to sync sidebar expand/collapse
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    if (!profileOpen) return;

    const handleClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans antialiased">
      {/* Sidebar Fixed */}
      <div className="fixed h-screen">
        <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      </div>

      {/* Main Area */}
      <div
        className={`flex-1 flex flex-col overflow-y-auto transition-all duration-300 ${
          sidebarExpanded ? 'ml-68' : 'ml-20'
        }`}
      >
        {/* Navbar */}
        <nav className="bg-blue-700 shadow">
          <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <FaKey size={24} /> Smart Key
            </h1>

            {/* Profile Dropdown */}
            <div
              className="relative flex items-center"
              ref={profileRef}
              style={{ minHeight: 40 }}
            >
              <button
                className="focus:outline-none"
                onClick={() => setProfileOpen((open) => !open)}
                style={{ height: 40, display: 'flex', alignItems: 'center' }}
              >
                <FaUserCircle size={32} className="text-white" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full w-48 bg-white rounded shadow-lg z-10">
                  <a href="#" className="block px-3 py-1 text-gray-800 hover:bg-blue-100">
                    My Account
                  </a>
                  <a href="#" className="block px-3 py-1 text-gray-800 hover:bg-blue-100">
                    Logout
                  </a>
                  <a href="#" className="block px-3 py-1 text-gray-800 hover:bg-blue-100">
                    Login Session
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Optional Header */}
        {header && (
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
