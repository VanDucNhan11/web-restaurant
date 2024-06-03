
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './Profile';
import History from './ReservationHistory';
import DashSiderbar from './DashSiderbar';
import AccountManagement from './AccountManagement';
import CategoryManagement from './CategoryManagement';
import EmployeeManagement from './EmployeeManagement';
import PostManagement from './PostManagement';
import TableManagement from './TableManagement';
import Reports from './Reports';
import MenuManagement from './MenuManagement';
import DuyetPhieuDB from './DuyetPhieuDatBan'
import ChiTietHoaDon from './InvoiceDetails'

// Dashboard.js
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  console.log(tab);

  return (
    <div className='flex'>
      <div>
        <DashSiderbar />
      </div>
      <div className='p-3 bg-gray-300 w-full'>
        {tab === 'profile' && <Profile />}
        {tab === 'history' &&  <History />}
        {tab === 'DuyetPhieuDB' &&  <DuyetPhieuDB />}
        {tab === 'XuatHoaDon' &&  <ChiTietHoaDon />}
        {tab === 'account-management' &&  <AccountManagement />}
        {tab === 'category-management' &&  <CategoryManagement />}
        {tab === 'menu-management' &&  <MenuManagement />}
        {tab === 'employee-management' &&  <EmployeeManagement />}
        {tab === 'post-management' &&  <PostManagement />}
        {tab === 'table-management' &&  <TableManagement />}
        {tab === 'reports' &&  <Reports />}
      </div>
    </div>
  );
}

export default Dashboard;

