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
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Menu Management</h1>
      <div className="flex justify-end mb-4">
        <button onClick={() => { setCurrentItem({}); setIsModalOpen(true); }} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Add Menu Item</button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Danh mục</th>
              <th className="py-3 px-6 text-left">Tên món</th>
              <th className="py-3 px-6 text-left">Mô tả</th>
              <th className="py-3 px-6 text-left">Giá</th>
              <th className="py-3 px-6 text-left">Hình ảnh</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {menuItems.map((item) => (
              <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{item._id}</td>
                <td className="py-3 px-6 text-left">{item.categoryID.name}</td>
                <td className="py-3 px-6 text-left">{item.itemName}</td>
                <td className="py-3 px-6 text-left">{item.description}</td>
                <td className="py-3 px-6 text-left">{item.price}</td>
                <td className="py-3 px-6 text-left">
                  {item.image && (
                    <img src={`http://localhost:3000/${item.image}`} alt={item.itemName} className="w-16 h-16 object-cover" />
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300">Delete</button>
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
          <h2 className="text-2xl mb-4">{currentItem._id ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
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
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-300">Cancel</button>
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Save</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };
  
  export default MenuManagement;
  
