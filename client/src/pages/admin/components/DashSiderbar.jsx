import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const DashSiderbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
        <div className="p-6 flex flex-col items-center">
          <img src="https://madamelan.vn/storage/logo-favicon/full-logo-min-1.png" alt="Logo" className="h-16 mb-4"/>
          <h1 className="text-2xl font-bold">My Admin</h1>
        </div>
        <nav className="flex-1 mt-10 space-y-2 px-4">
          <Link to="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
            Profile
          </Link>
          <Link to="/history" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
            Booking History
          </Link>
          <Link to="/account-management" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
            Account Management
          </Link>
          <Link to="/category-management" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
            Category Management
          </Link>
          <Link to="/employee-management" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
            Employee Management
          </Link>
          <Link to="/post-management" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
            Post Management
          </Link>
          <Link to="/table-management" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
            Table Management
          </Link>
          <Link to="/reports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
            Reports
          </Link>
        </nav>
      </div>
     </div> 
  )
}
export default DashSiderbar;