import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableManagement = () => {
  const [tables, setTables] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTableData, setNewTableData] = useState({ quantity: '', type: '', area: '', tableNumber: '', status: 'Còn Trống' });
  const [editTableData, setEditTableData] = useState({});
  const [filterArea, setFilterArea] = useState('');

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const handleAddTable = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/tables', newTableData);
      setTables([...tables, response.data]);
      closeAddModal();
    } catch (error) {
      console.error('Error adding table:', error);
    }
  };

  const saveUpdatedTable = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/tables/${editTableData._id}`, editTableData);
      const updatedTableIndex = tables.findIndex(table => table._id === editTableData._id);
      const updatedTables = [...tables];
      updatedTables[updatedTableIndex] = response.data;
      setTables(updatedTables);
      closeEditModal();
    } catch (error) {
      console.error('Error saving updated table:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/tables/${id}`);
      setTables(tables.filter(table => table._id !== id));
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  const openAddModal = () => {
    setNewTableData({ quantity: '', type: '', area: '', tableNumber: '', status: 'Còn Trống' });
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openEditModal = (table) => {
    setEditTableData(table);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'add') {
      setNewTableData({ ...newTableData, [name]: value });
    } else if (type === 'edit') {
      setEditTableData({ ...editTableData, [name]: value });
    }
  };

  const handleFilterChange = (e) => {
    setFilterArea(e.target.value);
  };

  // Lọc danh sách bàn dựa trên khu đã chọn
  const filteredTables = tables.filter(table => {
    if (filterArea === '') {
      return true; // Hiển thị tất cả nếu chưa chọn khu
    } else {
      return table.area === filterArea;
    }
  });

  const getStatusColor = (status) => {
    if (status === 'Đang phục vụ') {
      return 'bg-red-500'; 
    } else if (status === 'Còn Trống') {
      return 'bg-green-400'; // màu xanh lá
    } else {
      return ''; // hoặc trường hợp khác bạn có thể xử lý tùy ý
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Danh sách bàn</h1>
      <div className="flex justify-between mb-4">
        <div>
          <button
            onClick={openAddModal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Thêm
          </button>
        </div>
        <div className="relative">
          <label htmlFor="filterArea" className="mr-2">Lọc theo khu:</label>
          <select
            id="filterArea"
            onChange={handleFilterChange}
            value={filterArea}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Tất cả</option>
            <option value="A">Khu A</option>
            <option value="B">Khu B</option>
            <option value="C">Khu C</option>
            <option value="D">Khu D</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Số lượng ghế</th>
              <th className="py-3 px-6 text-center">Loại bàn</th>
              <th className="py-3 px-6 text-center">Khu</th>
              <th className="py-3 px-6 text-center">Bàn số</th>
              <th className="py-3 px-6 text-center">Trạng thái</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredTables.map((table) => (
              <tr key={table._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{table.quantity}</td>
                <td className="py-3 px-6 text-center">{table.type}</td>
                <td className="py-3 px-6 text-center">{table.area}</td>
                <td className="py-3 px-6 text-center">{table.tableNumber}</td>
                <td className={`py-3 px-6 text-center ${getStatusColor(table.status)} border  rborder-gray-300 rounded-md`}>
                  {table.status}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => openEditModal(table)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300 mr-2 border border-gray-300 rounded-md"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(table._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300 border border-gray-300 rounded-md"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Thêm bàn mới</h2>
            <label htmlFor="quantity" className="block mb-2">
              Số ghế:
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={newTableData.quantity}
                onChange={(e) => handleChange(e, 'add')}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              />
            </label>
            <label htmlFor="type" className="block mb-2">
              Loại bàn:
              <input
                type="text"
                id="type"
                name="type"
                value={newTableData.type}
                onChange={(e) => handleChange(e, 'add')}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              />
            </label>
            <label htmlFor="area" className="block mb-2">
              Khu:
              <select
                id="area"
                name="area"
                value={newTableData.area}
                onChange={(e) => handleChange(e, 'add')}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              >
                <option value=""></option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="VIP">VIP</option>
              </select>
            </label>
            <label htmlFor="tableNumber" className="block mb-2">
              Bàn số:
              <input
                type="number"
                id="tableNumber"
                name="tableNumber"
                value={newTableData.tableNumber}
                onChange={(e) => handleChange(e, 'add')}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeAddModal}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 mr-2"
              >
                Thoát
              </button>
              <button
                onClick={handleAddTable}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Sửa bàn</h2>
            <label htmlFor="quantity" className="block mb-2">
              Số lượng ghế:
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={editTableData.quantity}
                onChange={(e) => handleChange(e, 'edit')}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              />
            </label>
            <label htmlFor="type" className="block mb-2">
              Loại bàn:
              <input
                type="text"
                id="type"
                name="type"
                value={editTableData.type}
                onChange={(e) => handleChange(e, 'edit')}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              />
            </label>
            <label htmlFor="area" className="block mb-2">
              Khu:
              <select
                id="area"
                name="area"
                value={editTableData.area}
                onChange={(e) => handleChange(e, 'edit')}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="VIP">VIP</option>
              </select>
            </label>
            <label htmlFor="tableNumber" className="block mb-2">
              Bàn số:
              <input
                type="number"
                id="tableNumber"
                name="tableNumber"
                value={editTableData.tableNumber}
                onChange={(e) => handleChange(e, 'edit')}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              />
            </label>
            <label htmlFor="status" className="block mb-2">
              Trạng thái:
              <select
                id="status"
                name="status"
                value={editTableData.status}
                onChange={(e) => handleChange(e, 'edit')}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              >
                <option value="Còn Trống">Còn Trống</option>
                <option value="Đang phục vụ">Đang phục vụ</option>
              </select>
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeEditModal}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 mr-2"
              >
                Thoát
              </button>
              <button
                onClick={saveUpdatedTable}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableManagement;

