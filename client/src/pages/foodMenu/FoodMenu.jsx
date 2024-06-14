import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState(JSON.parse(localStorage.getItem('selectedItems')) || []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setModalOpen(true);
  };

  const handleSelectItem = () => {
    const existingItem = selectedItems.find(selected => selected._id === selectedItem._id);
    let updatedItems;
    if (existingItem) {
      updatedItems = selectedItems.map(item =>
        item._id === selectedItem._id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedItems = [...selectedItems, { ...selectedItem, quantity }];
    }
    setSelectedItems(updatedItems);
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
    setModalOpen(false);
  };

  const handleRemoveItem = (item, e) => {
    e.stopPropagation(); // Ngăn chặn modal chi tiết hiện lên
    const updatedItems = selectedItems.filter(selectedItem => selectedItem._id !== item._id);
    setSelectedItems(updatedItems);
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFinishSelection = () => {
    navigate('/dat-cho');
  };

  const renderMenuItems = (categoryId) => {
    return menuItems
      .filter(item => item.categoryID._id === categoryId)
      .map(item => {
        const selectedItem = selectedItems.find(selected => selected._id === item._id);
        return (
          <div
            key={item._id}
            className={`bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center mt-5 ${
              selectedItem ? 'border-2 border-green-500' : ''
            }`}
            onClick={() => handleItemClick(item)}
          >
            <img className="h-80" src={`http://localhost:3000/${item.image}`} alt={item.itemName} />
            <h2 className="text-lg font-semibold">{item.itemName}</h2>
            <p className="text-gray-600">{item.price.toLocaleString('vi-VN')} VNĐ</p>
            {selectedItem && (
              <div>
                <span className="text-green-500">Đã chọn: {selectedItem.quantity}</span>
                <button className="text-red-500 ml-2" onClick={(e) => handleRemoveItem(item, e)}>Hủy chọn</button>
              </div>
            )}
          </div>
        );
      });
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

      {selectedItems.length > 0 && (
        <button className="bg-red-600 text-white font-bold py-2 px-4  mt-5 mb-5 mx-auto block" onClick={handleFinishSelection}>Đã chọn món xong</button>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} closeModal={closeModal} item={selectedItem} addSelectedItem={handleSelectItem} quantity={quantity} setQuantity={setQuantity} />
    </div>
  );
};

// Modal component
const Modal = ({ isOpen, closeModal, item, addSelectedItem, quantity, setQuantity }) => {
  if (!isOpen || !item) return null;

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) setQuantity(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={closeModal}></div>
      <div className="bg-white rounded-lg p-8 z-50 flex">
        <img className="h-80 mr-8" src={`http://localhost:3000/${item.image}`} alt={item.itemName} />
        <div>
          <h2 className="text-lg font-semibold">Tên món: {item.itemName}</h2>
          <p className="text-gray-600"><span className="font-bold text-xl">Mô tả: </span> {item.description}</p>
          <p className="text-gray-600 mt-10">Giá: {item.price.toLocaleString('vi-VN')} VNĐ</p>
          <div className="mt-5">
            <label className="block text-gray-700">Số lượng:</label>
            <input type="number" className="border rounded w-20 p-2" value={quantity} onChange={handleQuantityChange} min="1" />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={addSelectedItem}>Chọn món</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 ml-2" onClick={closeModal}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
