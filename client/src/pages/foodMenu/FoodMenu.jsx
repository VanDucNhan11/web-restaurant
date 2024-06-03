import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách menu:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
    }
  };

  const renderMenuItems = (categoryId) => {
    return menuItems
      .filter(item => item.categoryID._id === categoryId)
      .map(item => (
        <div key={item._id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center mt-5">
          <img className="h-80" src={`http://localhost:3000/${item.image}`} alt={item.itemName} />
          <h2 className="text-lg font-semibold">{item.itemName}</h2>
          <p className="text-gray-600">{item.price.toLocaleString('vi-VN')} VNĐ</p>
        </div>
      ));
  };

  return (
    <div>
      <div className="relative">
        <img className="w-full h-full" src="https://madamelan.vn/storage/20220409-madame-lan9212-mdl-mobi-thuc-don-menu-landing-page-eng-vie.jpg" alt="" />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-4xl md:text-6xl title-font">Thực đơn</h1>
        <div className="absolute mt-10 top-1/2 left-1/2 transform -translate-x-1/2 flex items-center text-white text-lg md:flex-row md:text-2xl font-light">
          <a href="/" className="mb-2 md:mb-0 md:mr-2">Trang chủ</a>
          <span className="md:mx-2">/</span>
          <span className="mb-2 md:mb-0 md:mr-2 ">Thực đơn</span>
        </div>
      </div>
      <div className="mx-auto items-center justify-center md:w-2/3">
        <img src="https://madamelan.vn/storage/menus/vi/0/pc/01.jpg" alt="" />
        <img src="https://madamelan.vn/storage/menus/vi/0/pc/02.jpg" alt="" />
      </div>
      <div className="a-background">
        {categories.map(category => (
          <div key={category._id}>
            <h1 className="title content-font-light text-center">{category.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-10 mx-auto items-center justify-center md:w-5/6">
              {renderMenuItems(category._id)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
