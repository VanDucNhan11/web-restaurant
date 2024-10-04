import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import FoodMenu from "./pages/foodMenu/FoodMenu";
import Reservations from "./pages/reservations/Reservations";
import Recruitment from "./pages/recruitment/Recruitment";
import News from "./pages/news/News";
import Login from "./pages/login-resister/login";
import Resister from "./pages/login-resister/resister";
import Abouts from "./pages/about/About";
import Dashboard from './pages/admin/components/Dashboard';
import DetailNews from './pages/news/DetailNews';
import ChatIcons from './components/ChatIcons';
import DetailRecruitment from './pages/recruitment/DetailRecruitment';
import Profile from './pages/admin/components/Profile';
import Historys from './pages/admin/components/ReservationHistory';
import Success from './pages/reservations/Success';
import Payment from './pages/reservations/Payment';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const location = useLocation();
  // Kiểm tra xem trang hiện tại có phải là trang dashboard không
  const isDashboardPage = location.pathname.startsWith('/dashboard');;
  return (
    <>
        <Routes>
          <Route path='/' element={<><Header /><Home /><Footer /></>} />
          <Route path='/ve-chung-toi' element={<><Header /><Abouts /><Footer /></>} />
          <Route path='/thuc-don' element={<><Header /><FoodMenu /><Footer /></>} />
          <Route path='/dat-cho' element={<><Header /><Reservations /><Footer /></>} />
          <Route path='/tin-tuc' element={<><Header /><News /><Footer /></>} />
          <Route path='/news/:id' element={<><Header /><DetailNews /><Footer /></>} />
          <Route path='/tuyen-dung' element={<><Header /><Recruitment /><Footer /></>} />
          <Route path='/tuyen-dung/:id' element={<><Header /><DetailRecruitment /><Footer /></>} />
          <Route path='/dang-nhap' element={<><Header /><Login /><Footer /></>} />
          <Route path='/dang-ky' element={<><Header /><Resister /><Footer /></>} />
          <Route path='/profile' element={<><Header /><Profile /><Footer /></>} />
          <Route path='/historyss' element={<><Header /><Historys /></>} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/payment' element={<><Header /><Payment /><Footer /></>} /> 
          <Route path='/success' element={<><Header /><Success /><Footer /></>} /> 
        </Routes>
      {!isDashboardPage && <ChatIcons />}
    </>
   
  );
}

export default App;
