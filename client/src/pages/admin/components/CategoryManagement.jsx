import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Thiết lập cho Modal

// Thành phần CategoryTable
const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Tên danh mục</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {categories.map((category) => (
            <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{category._id}</td>
              <td className="py-3 px-6 text-left">{category.name}</td>
              <td className="py-3 px-6 text-center">
                <button onClick={() => onEdit(category)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300">Edit</button>
                <button onClick={() => onDelete(category._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Trang CategoryManagement
const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Thêm state cho modal thêm danh mục
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Thêm state cho modal chỉnh sửa danh mục
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách danh mục:', error);
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setEditCategoryName(category.name);
    setIsEditModalOpen(true); // Chỉnh sửa modal thay vì modal thêm
  };

  const handleSaveEdit = async () => {
    try {
      // Gửi yêu cầu cập nhật đến backend
      await axios.put(`http://localhost:3000/api/v1/categories/${editCategory._id}`, { name: editCategoryName });
      
      // Cập nhật danh sách danh mục sau khi cập nhật thành công
      const updatedCategories = categories.map(category =>
        category._id === editCategory._id ? { ...category, name: editCategoryName } : category
      );
      setCategories(updatedCategories);
      
      // Đóng modal chỉnh sửa
      setIsEditModalOpen(false);
      setEditCategory(null);
      setEditCategoryName(''); // Cập nhật giá trị editCategoryName thành rỗng sau khi lưu
    } catch (error) {
      console.error('Có lỗi xảy ra khi chỉnh sửa danh mục:', error);
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/categories/${id}`);
      setCategories(categories.filter(category => category._id !== id));
    } catch (error) {
      console.error('Có lỗi xảy ra khi xóa danh mục:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const newCategory = { name: newCategoryName };
      const response = await axios.post('http://localhost:3000/api/v1/categories', newCategory);
      setCategories([...categories, response.data]);
      setIsAddModalOpen(false);
      setNewCategoryName('');
    } catch (error) {
      console.error('Có lỗi xảy ra khi thêm danh mục:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Quản lý danh mục</h1>
      <div className="flex justify-end mb-4">
        <button onClick={() => setIsAddModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Add Category</button>
      </div>
      <CategoryTable categories={categories} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          contentLabel="Add Category"
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl mb-4">Add New Category</h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border p-2 mb-4 w-full"
              placeholder="Enter category name"
            />
            <div className="flex justify-end">
              <button onClick={() => setIsAddModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-300">Cancel</button>
              <button onClick={handleAddCategory} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Add</button>
            </div>
          </div>
        </Modal>

      <Modal
          isOpen={isEditModalOpen} 
          onRequestClose={() => setIsEditModalOpen(false)}
          contentLabel="Edit Category"
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl mb-4">Edit Category</h2>
            <input
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              className="border p-2 mb-4 w-full"
              placeholder="Enter new category name"
            />
            <div className="flex justify-end">
              <button onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-300">Cancel</button>
              <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Save</button>
            </div>
          </div>
        </Modal>
    </div>
  );
};

export default CategoryManagement;

