import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = ({ users, handleUpdateRole, handleDeleteUser, filter }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [showDropdownRowId, setShowDropdownRowId] = useState(null); // State để lưu ID của hàng đang hiển thị dropdown menu

  const handleSaveRole = (userId) => {
    handleUpdateRole(userId, selectedRole);
    setShowDropdownRowId(null); // Reset state để ẩn dropdown menu của hàng đã được chọn
    setSelectedRole(''); // Reset selectedRole về trạng thái mặc định
  };

  const handleCancel = () => {
    setShowDropdownRowId(null); // Reset state để ẩn dropdown menu khi hủy bỏ
    setSelectedRole(''); // Reset selectedRole về trạng thái mặc định
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'Khách hàng') {
      return user.role === 'Khách hàng';
    } else if (filter === 'Nhân viên') {
      return user.role === 'Nhân viên';
    } else if (filter === 'Quản trị viên') {
      return user.role === 'Quản trị viên';
    } else {
      return true; // Hiển thị tất cả nếu không có bộ lọc hoặc bộ lọc là ''
    }
  });

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Tên</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Quyền</th>
            <th className="py-3 px-6 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{user.username}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">{user.role}</td>
              <td className="py-3 px-6 text-center">
                <button onClick={() => setShowDropdownRowId(user._id)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300">Cập nhật quyền</button>
                <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300">Xóa tài khoản</button>
                {/* Dropdown menu để chọn quyền mới */}
                {showDropdownRowId === user._id && (
                  <div>
                    <select className="mt-3 mb-3" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                      <option value="">Chọn quyền</option>
                      <option value="Khách hàng">Khách hàng</option>
                      <option value="Nhân viên">Nhân viên</option>
                      <option value="Quản trị viên">Quản trị viên</option>
                    </select>
                    <div className="">
                      <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-700 transition duration-300">Thoát</button>
                      <button onClick={() => handleSaveRole(user._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Lưu</button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AccountManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateRole = async (userId, role) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/user/${userId}/role`, { role });
      console.log(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/user/${userId}`);
      console.log(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Danh sách tài khoản</h1>
      {/* Dropdown hoặc các nút để lọc */}
      <div className="flex justify-center mb-4">
        <button onClick={() => handleFilterChange('')} className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-l-md ${filter === '' ? 'bg-gray-500' : 'hover:bg-gray-400'} transition duration-300`}>Tất cả</button>
        <button onClick={() => handleFilterChange('Khách hàng')} className={`bg-gray-300 text-gray-700 px-3 py-1 ${filter === 'Khách hàng' ? 'bg-gray-500' : 'hover:bg-gray-400'} transition duration-300`}>Khách hàng</button>
        <button onClick={() => handleFilterChange('Nhân viên')} className={`bg-gray-300 text-gray-700 px-3 py-1 ${filter === 'Nhân viên' ? 'bg-gray-500' : 'hover:bg-gray-400'} transition duration-300`}>Nhân viên</button>
        <button onClick={() => handleFilterChange('Quản trị viên')} className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-r-md ${filter === 'Quản trị viên' ? 'bg-gray-500' : 'hover:bg-gray-400'} transition duration-300`}>Quản trị viên</button>
      </div>
      {/* Bảng danh sách tài khoản */}
      <UserTable users={users} handleUpdateRole={handleUpdateRole} handleDeleteUser={handleDeleteUser} filter={filter} />
    </div>
  );
};

export default AccountManagement;
