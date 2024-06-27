import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DashSiderbar = () => {
  const navigate = useNavigate();
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
    <div className="flex flex-col h-screen">
      <header className="bg-gray-300 text-black py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-20">
        <div className="flex items-center">
          <button onClick={() => navigate('/')} className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center mr-5">
            <ion-icon name="chevron-back-circle-outline" className="text-xl mr-1" />
            <span className="ml-1">Quay lại</span>
          </button>
          <div className="flex items-center mr-4">
            <ion-icon name="card-outline"></ion-icon>
            <h1 className="ml-2 text-2xl title-1 title-font">Bảng điều khiển</h1>
          </div>
        </div>
        <div className="flex items-center">
          <img src={currentUser.profilePicture} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
          <span>{currentUser.role}</span>
        </div>
      </header>
      <div className="w-64 bg-white-100 text-black z-10 pt-24"> 
        <nav className="flex-1 space-y-2 px-4 ">
          <Link
            to="/dashboard?tab=profile"
            className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'profile' || !tab ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
            <ion-icon name="person-circle-outline" class="mr-3"></ion-icon>
            Thông tin cá nhân
          </Link>
          {currentUser.role === 'Khách hàng' && (
            <Link
              to="/dashboard?tab=history"
              className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'history' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
              <ion-icon name="time-outline" class="mr-3"></ion-icon>
              Lịch sử đặt bàn
            </Link>
          )}
          {currentUser.role === 'Nhân viên' && (
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
                Hệ thông thanh toán
              </Link>
              <Link
                to="/dashboard?tab=UpdateInvoice"
                className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'UpdateInvoice' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
                <ion-icon name="albums-outline" class="mr-3"></ion-icon>
                Cập nhật hoá đơn
              </Link>
            </>
          )}
          {currentUser.role === 'Quản trị viên' && (
            <>
              <Link
                to="/dashboard?tab=account-management"
                className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'account-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
                <ion-icon name="settings-outline" class="mr-3"></ion-icon>
                Cập nhật phân quyền tài khoản
              </Link>
              <Link
                to="/dashboard?tab=employee-management"
                className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'employee-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
                <ion-icon name="people-outline" class="mr-3"></ion-icon>
                Quản lý nhân viên
              </Link>
              <Link
                to="/dashboard?tab=table-management"
                className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'table-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
                <ion-icon name="grid-outline" class="mr-3"></ion-icon>
                Quản lý bàn
              </Link>
              <Link
                to="/dashboard?tab=category-management"
                className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'category-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
                <ion-icon name="list-outline" class="mr-3"></ion-icon>
                Cập nhật danh mục thực đơn
              </Link>
              <Link
                to="/dashboard?tab=menu-management"
                className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'menu-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
                <ion-icon name="fast-food-outline" class="mr-3"></ion-icon>
                Cập nhật thực đơn
              </Link>
              <Link
                to="/dashboard?tab=post-management"
                className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'post-management' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
                <ion-icon name="document-text-outline" class="mr-3"></ion-icon>
                Cập nhật bài viết
              </Link>
              <Link
                to="/dashboard?tab=recruitment-update"
                className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'recruitment-update' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
                <ion-icon name="document-text-outline" class="mr-3"></ion-icon>
                Cập nhật bài tuyển dụng
              </Link>
              <Link
                to="/dashboard?tab=reports"
                className={`block py-2.5 px-4 rounded transition duration-200 flex items-center ${tab === 'reports' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-700 hover:text-gray-100'}`}>
                <ion-icon name="bar-chart-outline" class="mr-3"></ion-icon>
                Thống kê
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default DashSiderbar;
