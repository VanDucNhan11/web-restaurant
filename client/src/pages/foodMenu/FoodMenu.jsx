// code foodmenu vaoo day


import React from 'react'

const FoodMenu = () => {
  return (
    <div>
      <div className="relative">
          <img className="w-full h-full" src="https://madamelan.vn/storage/20220409-madame-lan9212-mdl-mobi-thuc-don-menu-landing-page-eng-vie.jpg" alt="" />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-4xl md:text-6xl  title-font">Thực đơn</h1>
          <div className="absolute mt-10 top-1/2 left-1/2 transform -translate-x-1/2 flex items-center text-white text-lg md:flex-row md:text-2xl font-light">
              <a href="/"  className="mb-2 md:mb-0 md:mr-2">Trang chủ</a>
              <span className="md:mx-2">/</span>
              <span className="mb-2 md:mb-0 md:mr-2 ">Thực đơn</span>
          </div>
      </div>
      <div className="mx-auto  items-center justify-center  md:w-2/3" >
        <img src="https://madamelan.vn/storage/menus/vi/0/pc/01.jpg" alt="" />
        <img src="https://madamelan.vn/storage/menus/vi/0/pc/02.jpg" alt="" />
      </div>
      <div  className="a-backround">
        <h1 className="title content-font-light text-center">Thức ăn</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-10 mx-auto  items-center justify-center md:w-5/6 ">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center mt-5 ">
              <img className="h-80" src="https://phobiendanang.com/wp-content/uploads/2020/09/124-Nem-lui-vn-420x574.jpg" alt="" />
              <h2 className="text-lg font-semibold ">Nem lụi Việt Nam</h2>
              <p className="text-gary-600">120.000 VNĐ</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center mt-5">
              <img className="h-80" src="https://phobiendanang.com/wp-content/uploads/2020/09/123-Nem-lui-ngon-420x564.jpg" alt="" />
              <h2 className="text-lg font-semibold">Nem lụi ngon</h2>
              <p className="text-gary-600">130.000 VNĐ</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center mt-5">
              <img className="h-80" src="https://phobiendanang.com/wp-content/uploads/2020/09/163-My-quang-Da-nang-420x597.jpg" alt=""/>
              <h2 className="text-lg font-semibold">Mỳ Quảng</h2>
              <p className="text-gary-600">150.000 VNĐ</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center mt-5">
              <img className="h-80" src="https://phobiendanang.com/wp-content/uploads/2020/09/126-Xuc-xich-tuoi-nuong-420x564.jpg" alt="" />
              <h2 className="text-lg font-semibold">Xúc xích tươi nướng</h2>
              <p className="text-gary-600">70.000 VNĐ</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center mt-5"> 
              <img className="h-80" src="https://phobiendanang.com/wp-content/uploads/2020/09/10-Salad-cac-loai-ca-420x500.jpg" alt="" />
              <h2 className="text-lg font-semibold">Salad các loại cá</h2>
              <p className="text-gary-600">200.000 VNĐ</p>
          </div>
        </div>
        <h1 className="title content-font-light text-center">Thức uống</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-10 mx-auto  items-center justify-center md:w-5/6 ">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center mt-5 ">
              <img className="h-80" src="https://phobiendanang.com/wp-content/uploads/2020/09/192-Che-xoi-nuoc-420x564.jpg" alt="" />
              <h2 className="text-lg font-semibold">Trè trôi nước</h2>
              <p className="text-gary-600">50.000 VNĐ</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center mt-5">
              <img className="h-80" src="https://phobiendanang.com/wp-content/uploads/2020/09/197-So-cola-nong-420x482.jpg" alt="" />
              <h2 className="text-lg font-semibold">Socola nóng</h2>
              <p className="text-gary-600">70.000 VNĐ</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center mt-5">
              <img className="h-80" src="https://phobiendanang.com/wp-content/uploads/2020/09/198-Soup-mua-xuan-420x500.jpg" alt=""/>
              <h2 className="text-lg font-semibold">Rau xanh mùa xuân</h2>
              <p className="text-gary-600">30.000 VNĐ</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default FoodMenu
