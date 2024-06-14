
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
import RecruitmentUpdate from './RecruitmentUpdate'

// Dashboard.js
const Dashboard = () => {
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
        setTab('profile');
      
    }
  }, [location.search, currentUser]);

  console.log(tab);

  return (
    <div className='flex'>
      <div className='fixed bg-gray-300 top-0 left-0 h-full'>
        <DashSiderbar />
      </div>
      <div className='pl-64 p-3 w-full  pt-24'>
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
        {tab === 'recruitment-update' &&  <RecruitmentUpdate />}
        {tab === 'reports' &&  <Reports />}
      </div>
    </div>
  );
}

export default Dashboard;

