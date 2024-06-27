import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const UpdateInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [updatedInvoice, setUpdatedInvoice] = useState({ selectedItems: [] });
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchMenu, setSearchMenu] = useState('');

  useEffect(() => {
    fetchInvoices();
    fetchMenuItems();
  }, []);

  useEffect(() => {
    if (selectedInvoiceId) {
      const invoice = invoices.find(inv => inv._id === selectedInvoiceId);
      setSelectedInvoice(invoice);
      setUpdatedInvoice(invoice || { selectedItems: [] });
    }
  }, [selectedInvoiceId, invoices]);

  useEffect(() => {
    fetchFilteredInvoices();
  }, [selectedDate, selectedArea]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchFilteredInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/invoices', {
        params: {
          date: selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : '',
          area: selectedArea,
        },
      });
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching filtered invoices:', error);
    }
  };

  const handleInvoiceChange = (e) => {
    setSelectedInvoiceId(e.target.value);
  };

  const calculateTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const vat = items.reduce((acc, item) => {
      const vatRate = item.area === 'VIP' ? 0.15 : 0.1;
      return acc + item.price * item.quantity * vatRate;
    }, 0);
    return subtotal + vat;
  };

  const handleItemChange = (itemId, quantity) => {
    const updatedItems = updatedInvoice.selectedItems.map(item =>
      item._id === itemId ? { ...item, quantity: quantity || 1 } : item
    );
    const newTotal = calculateTotal(updatedItems);
    setUpdatedInvoice(prevState => ({
      ...prevState,
      selectedItems: updatedItems,
      total: newTotal,
    }));
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = updatedInvoice.selectedItems.filter(item => item._id !== itemId);
    const newTotal = calculateTotal(updatedItems);
    setUpdatedInvoice(prevState => ({
      ...prevState,
      selectedItems: updatedItems,
      total: newTotal,
    }));
  };

  const handleAddItem = (itemToAdd) => {
    const existingItem = updatedInvoice.selectedItems.find(item => item._id === itemToAdd._id);
    let updatedItems;
    if (existingItem) {
      updatedItems = updatedInvoice.selectedItems.map(item =>
        item._id === itemToAdd._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...updatedInvoice.selectedItems, { ...itemToAdd, quantity: 1 }];
    }
    const newTotal = calculateTotal(updatedItems);
    setUpdatedInvoice(prevState => ({
      ...prevState,
      selectedItems: updatedItems,
      total: newTotal,
    }));
  };

  const handleUpdateInvoice = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/invoices/${selectedInvoiceId}`, updatedInvoice);
      alert('Invoice updated successfully');
      fetchInvoices();
    } catch (error) {
      console.error('Error updating invoice:', error);
      alert('Failed to update invoice');
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    (!selectedDate || format(new Date(invoice.date), 'yyyy-MM-dd') === format(new Date(selectedDate), 'yyyy-MM-dd')) &&
    (!selectedArea || invoice.area === selectedArea) &&
    invoice.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMenuItems = menuItems.filter(item =>
    item.itemName.toLowerCase().includes(searchMenu.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Cập nhật hoá đơn</h2>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Lọc hoá đơn theo Ngày và Khu:</h3>
        <div className="flex space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2"
          />
          <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="border p-2">
            <option value="">Tất cả</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Tìm hoá đơn theo tên khách hàng:</h3>
        <input
          type="text"
          placeholder="Nhập tên"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Khu</th>
            <th className="py-2 px-4 border">Số bàn</th>
            <th className="py-2 px-4 border">Tên khách hàng</th>
            <th className="py-2 px-4 border">Ngày xuất hoá đơn</th>
            <th className="py-2 px-4 border">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map(invoice => (
            <tr key={invoice._id} onClick={() => setSelectedInvoiceId(invoice._id)} className="cursor-pointer">
              <td className="py-2 px-4 border text-center">{invoice.area}</td>
              <td className="py-2 px-4 border text-center">{invoice.tableNumber}</td>
              <td className="py-2 px-4 border text-center">{invoice.customerName}</td>
              <td className="py-2 px-4 border text-center">{format(new Date(invoice.date), 'dd/MM/yyyy')}</td>
              <td className="py-2 px-4 border text-center">{invoice.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedInvoice && (
        <div className="mt-4 p-4 border bg-gray-100">
          <h3 className="text-xl font-semibold mb-2">Chi tiết hoá đơn</h3>
          <h4 className=" font-semibold mb-2">Tên khách hàng: </h4>
          <input
            type="text"
            value={updatedInvoice.customerName}
            onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, customerName: e.target.value })}
            placeholder="Customer Name"
            className="border p-2 mb-4 w-full"
          />
          <ul className="mb-4">
            <h4 className=" font-semibold mb-2">Các món ăn trong hoá đơn: </h4>
            {updatedInvoice.selectedItems.map(item => (
              <li key={item._id} className="flex items-center mb-2">
                <span className="flex-1">{item.itemName} - Price: {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(item._id, parseInt(e.target.value))}
                  min="0"
                  className="border p-2 w-16"
                />
                <button onClick={() => handleDeleteItem(item._id)} className="ml-2 text-red-500">Xoá</button>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Chỉnh sửa món ăn</h3>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Thêm món ăn</button>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Tổng tiền: {updatedInvoice.total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
          </div>
          <button  className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-5">Đóng</button>
          <button onClick={handleUpdateInvoice} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Lưu thay đổi</button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-2">Thực đơn</h3>
            <input
              type="text"
              placeholder="Tìm kiếm món ăn"
              value={searchMenu}
              onChange={(e) => setSearchMenu(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <ul className="max-h-64 overflow-y-auto mb-4">
              {filteredMenuItems.map(item => (
                <li key={item._id} onClick={() => handleAddItem(item)} className="flex items-center p-2 border mb-2 cursor-pointer">
                  <img src={`http://localhost:3000/${item.image}`} alt={item.itemName} className="w-12 h-12 mr-4" />
                  <span className="flex-1">{item.itemName}</span>
                  <input
                    type="checkbox"
                    checked={updatedInvoice.selectedItems.some(i => i._id === item._id)}
                    readOnly
                    className="ml-2"
                  />
                </li>
              ))}
            </ul>
            <button onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded">Thoát</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateInvoice;
