import React, { useState } from 'react';

// Thành phần CategoryTable
const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {categories.map((category) => (
            <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{category.id}</td>
              <td className="py-3 px-6 text-left">{category.name}</td>
              <td className="py-3 px-6 text-left">{category.description}</td>
              <td className="py-3 px-6 text-center">
                <button onClick={() => onEdit(category)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300">Edit</button>
                <button onClick={() => onDelete(category.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300">Delete</button>
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
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category 1', description: 'Description for category 1' },
    { id: 2, name: 'Category 2', description: 'Description for category 2' },
    { id: 3, name: 'Category 3', description: 'Description for category 3' },
    // Thêm nhiều danh mục khác nếu cần
  ]);

  const [editCategory, setEditCategory] = useState(null);

  const handleEdit = (category) => {
    setEditCategory(category);
    // Bạn có thể thêm logic mở modal hoặc form để chỉnh sửa danh mục
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
    // Bạn có thể thêm logic xóa danh mục khỏi server
  };

  const handleAddCategory = () => {
    const newCategory = { id: categories.length + 1, name: 'New Category', description: 'New Description' };
    setCategories([...categories, newCategory]);
    // Bạn có thể thêm logic mở modal hoặc form để thêm danh mục mới
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Category Management</h1>
      <div className="flex justify-end mb-4">
        <button onClick={handleAddCategory} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Add Category</button>
      </div>
      <CategoryTable categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default CategoryManagement;
