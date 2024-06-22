import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMenuItems = menuItems.filter(item => {
    return item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setImagePreview(`http://localhost:3000/${item.image}`);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/menu/${id}`);
      setMenuItems(menuItems.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (!currentItem.itemName || !currentItem.description || !currentItem.price || !currentItem.categoryID) {
        alert('Please fill in all the fields');
        return;
      }

      const formData = new FormData();
      formData.append('itemName', currentItem.itemName);
      formData.append('description', currentItem.description);
      formData.append('price', currentItem.price);
      formData.append('categoryID', currentItem.categoryID);

      if (currentItem.image && currentItem.image instanceof File) {
        formData.append('image', currentItem.image, 'image.png');
      }

      if (currentItem._id) {
        await axios.put(`http://localhost:3000/api/v1/menu/${currentItem._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        const response = await axios.post('http://localhost:3000/api/v1/menu', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMenuItems([...menuItems, response.data]);
      }

      setIsModalOpen(false);
      setCurrentItem({});
      setImagePreview(null);
      fetchMenuItems();
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentItem({ ...currentItem, image: file });
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Danh sách món ăn</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg py-2 px-4 block w-64 appearance-none leading-normal"
            placeholder="Tìm kiếm món ăn"
          />
          <div className="absolute right-0 top-0 mt-3 mr-4 text-gray-600">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M17.5 16h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l5 4.99L22 21.5l-4.5-4.5zm-6 0C7.01 16 5 13.99 5 11.5S7.01 7 9.5 7 14 9.01 14 11.5 11.99 16 9.5 16z"
              />
            </svg>
          </div>
        </div>
        <button
          onClick={() => { setCurrentItem({}); setIsModalOpen(true); }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Thêm món ăn
        </button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Danh mục</th>
              <th className="py-3 px-6 text-center">Tên món</th>
              <th className="py-3 px-6 text-center">Mô tả</th>
              <th className="py-3 px-6 text-center">Giá</th>
              <th className="py-3 px-6 text-center">Hình ảnh</th>
              <th className="py-3 px-6 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
          {filteredMenuItems.map((item) => (
            <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{item.categoryID.name}</td>
              <td className="py-3 px-6 text-left">{item.itemName}</td>
              <td className="py-3 px-6 text-left">{item.description}</td>
              <td className="py-3 px-6 text-left">{item.price.toLocaleString('vi-VN')} VNĐ</td>
              <td className="py-3 px-6 text-left">
                {item.image && (
                  <img src={`http://localhost:3000/${item.image}`} alt={item.itemName} className="w-16 h-16 object-cover" />
                )}
              </td>
              <td className="py-3 px-6 text-center">
                <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300">Sửa</button>
                <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300 mt-2">Xoá</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add/Edit Menu Item"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl mb-4">{currentItem._id ? 'Sửa món ăn' : 'Thêm món ăn'}</h2>
          <input
            type="text"
            value={currentItem.itemName || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, itemName: e.target.value })}
            className="border p-2 mb-4 w-full"
            placeholder="Tên món"
          />
          <input
            type="text"
            value={currentItem.description || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
            className="border p-2 mb-4 w-full"
            placeholder="Mô tả"
            />
            <input
              type="number"
              value={currentItem.price || ''}
              onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
              className="border p-2 mb-4 w-full"
              placeholder="Giá"
            />
            <select
              value={currentItem.categoryID || ''}
              onChange={(e) => setCurrentItem({ ...currentItem, categoryID: e.target.value })}
              className="border p-2 mb-4 w-full"
            >
              <option value="">Chọn danh mục</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
            <input
              type="file"
              onChange={handleImageChange}
              className="border p-2 mb-4 w-full"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover mb-4" />
            )}
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-300">Thoát</button>
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Lưu</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };
  
  export default MenuManagement;
  
