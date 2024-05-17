import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import Sidebar from "./pages/profile/Sidebar";
import History from "./pages/profile/Profile";

function App() {
  return (
    <>
      <Header />
      <div className="">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ve-chung-toi' element={<Abouts />} />
          <Route path='/thuc-don' element={<FoodMenu />} />
          <Route path='/dat-cho' element={<Reservations />} />
          <Route path='/tin-tuc' element={<News />} />
          <Route path='/tuyen-dung' element={<Recruitment />} />
          <Route path='/dang-nhap' element={<Login />} /> 
          <Route path='/dang-ky' element={<Resister />} />
          {/* Route cho Sidebar với các trang con */}
          <Route path='/profile/*' element={<Sidebar />} />
        </Routes>
      </div> 
      <Footer />
    </>
  );
}

export default App;
