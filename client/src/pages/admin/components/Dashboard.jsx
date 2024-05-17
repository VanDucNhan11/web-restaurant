
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {

  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])

  console.log(tab);

  return (
    <div>
      <h2 className='flex mt-32'>Dashboard</h2>
      <p>Tóm tắt hệ thống.</p>
    </div>
  );
}

export default Dashboard;
