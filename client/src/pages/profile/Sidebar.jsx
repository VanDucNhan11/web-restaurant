import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import History from './History';

const Sidebar = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 h-screen bg-bg-header text-white">
        <div className="p-6">
          <h1 className="mt-10 text-2xl font-bold">My account</h1>
          <nav className="mt-10">
            <Link to="profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-400">
              Profile
            </Link>
            <Link to="history" className="block py-2.5 px-4 mt-2 rounded transition duration-200 hover:bg-gray-400">
              Booking History
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex-1 p-8">
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
};

export default Sidebar;
