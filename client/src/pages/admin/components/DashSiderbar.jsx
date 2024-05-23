import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashSiderbar = () => {
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user);
  const [tab, setTab] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="w-64 h-screen bg-white-100 text-black">
      <div className="p-6 flex justify-center items-center">
        <div className="flex items-center">
          <ion-icon name="home"></ion-icon>
          <h1 className="ml-2 text-2xl font-bold">My Home</h1>
        </div>
      </div>
      <nav className="flex-1 space-y-2 px-4">
        <Link
          to="/dashboard?tab=profile"
          className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'profile' || !tab ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
          <ion-icon name="person-circle-outline" class="mr-3"></ion-icon>
          Profile
        </Link>

        {currentUser.role === 'Customer' && (
          <Link
            to="/dashboard?tab=history"
            className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'history' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
            <ion-icon name="time-outline" class="mr-3"></ion-icon>
            Lịch sử đặt bàn
          </Link>
        )}

        {currentUser.role === 'Employee' && (
          <>
            <Link
              to="/dashboard?tab=DuyetPhieuDB"
              className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'DuyetPhieuDB' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
              <ion-icon name="browsers-outline" class="mr-3"></ion-icon>
              Duyệt phiếu đặt bàn
            </Link>
            <Link
              to="/dashboard?tab=XuatHoaDon"
              className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'XuatHoaDon' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
              <ion-icon name="documents-outline" class="mr-3"></ion-icon>
              Chi tiết hoá đơn
            </Link>
          </>
        )}

        {currentUser.role === 'Admin' && (
          <>
            <Link
              to="/dashboard?tab=account-management"
              className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'account-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
              <ion-icon name="settings-outline" class="mr-3"></ion-icon>
              Account Management
            </Link>
            <Link
              to="/dashboard?tab=category-management"
              className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'category-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
              <ion-icon name="list-outline" class="mr-3"></ion-icon>
              Category Management
            </Link>
            <Link
              to="/dashboard?tab=menu-management"
              className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'menu-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
              <ion-icon name="fast-food-outline" class="mr-3"></ion-icon>
              Menu Management
            </Link>
            <Link
              to="/dashboard?tab=employee-management"
              className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'employee-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
              <ion-icon name="people-outline" class="mr-3"></ion-icon>
              Employee Management
            </Link>
            <Link
              to="/dashboard?tab=post-management"
              className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'post-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
              <ion-icon name="document-text-outline" class="mr-3"></ion-icon>
              Post Management
            </Link>
            <Link
              to="/dashboard?tab=table-management"
              className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'table-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
              <ion-icon name="grid-outline" class="mr-3"></ion-icon>
              Table Management
            </Link>
            <Link
              to="/dashboard?tab=reports"
              className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'reports' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
              <ion-icon name="bar-chart-outline" class="mr-3"></ion-icon>
              Reports
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default DashSiderbar;
