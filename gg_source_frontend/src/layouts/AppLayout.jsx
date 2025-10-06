import React from 'react';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';

function  AppLayout({ children, header = null }){
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = React.useRef();

  React.useEffect(() => {
    if (!profileOpen) return;
    function handleClick(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar*/}
        <nav className="bg-blue-700 shadow">
          <div className="max-w-6xl mx-auto px-4 py-2 flex justify-end items-center">
            <div className="flex items-center gap-4 justify-between w-full">
              <div className="flex items-center">
                <button className="focus:outline-none">
                  <BiMenu size={32} className="text-white" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Smart Key</h1>
                <div className="relative flex items-center" ref={profileRef} style={{ minHeight: 40 }}>
                  <button
                    className="focus:outline-none"
                    onClick={() => setProfileOpen((open) => !open)}
                    style={{ height: 40, display: 'flex', alignItems: 'center' }}
                  >
                    <FaUserCircle size={32} className="text-white" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full w-48 bg-white rounded shadow-lg z-10">
                      <a href="#" className="block px-3 py-1 text-gray-800 hover:bg-blue-100">My Account</a>
                      <a href="#" className="block px-3 py-1 text-gray-800 hover:bg-blue-100">Logout</a>
                      <a href="#" className="block px-3 py-1 text-gray-800 hover:bg-blue-100">Login Session</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Heading */}
        {header && (
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;