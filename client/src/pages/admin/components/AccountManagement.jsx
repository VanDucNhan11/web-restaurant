import React from 'react';

// Thành phần UserTable
const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{user.id}</td>
              <td className="py-3 px-6 text-left">{user.name}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Trang AccountManagement
const AccountManagement = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com' },
    // Thêm nhiều người dùng khác nếu cần
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Quản lý tài khoản</h1>
      <UserTable users={users} />
    </div>
  );
};

export default AccountManagement;
