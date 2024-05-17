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
    <div className=" ">
      <div className="w-64 h-screen bg-gray-800 text-white">
        <div className="p-6 flex justify-center items-center">
          <h1 className="text-2xl font-bold">My Admin</h1>
        </div>
        <nav className="flex-1 space-y-2 px-4">
          <Link
            to="/dashboard?tab=profile"
            active={tab === 'profile' || !tab}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
            Profile
          </Link>
          <Link to="/dashboard?tab=history"
            active={tab === 'history' || !tab}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
            Booking History
          </Link>
          {
            !currentUser.isAdmin &&
            (<>
              <Link
                to="/dashboard?tab=account-management"
                active={tab === 'account-management' || !tab}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
                Account Management
              </Link>
              <Link to="/dashboard?tab=category-management"
                active={tab === 'category-management'}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
                Category Management
              </Link>
              <Link
                to="/dashboard?tab=employee-management"
                active={tab === 'employee-management'}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
                Employee Management
              </Link>
              <Link to="/dashboard?tab=post-management"
                active={tab === 'post-management' || !tab}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
                Post Management
              </Link>
              <Link to="/dashboard?tab=table-management"
                active={tab === 'table-management' || !tab}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
                Table Management
              </Link>
              <Link to="/dashboard?tab=reports"
                active={tab === 'reports' || !tab}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-gray-100">
                Reports
              </Link>
            </>
            )
          }
        </nav>
      </div>
    </div>
  )
}
export default DashSiderbar;