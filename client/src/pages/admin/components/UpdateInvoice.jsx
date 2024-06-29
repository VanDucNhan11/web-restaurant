import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

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
      const vatRate = item.area === 'VIP' ? 0.15 : 0.08;
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
      const total = calculateTotal(updatedInvoice.selectedItems);
      await axios.put(`http://localhost:3000/api/v1/invoices/${selectedInvoiceId}`, {
        ...updatedInvoice,
        total: total,
      });
      alert('Hoá đơn đã được cập nhật thành công');
      fetchInvoices();
    } catch (error) {
      console.error('Lỗi khi cập nhật hoá đơn:', error);
      alert('Cập nhật hoá đơn thất bại');
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
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Thông tin hoá đơn</h3>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Tên khách hàng</label>
            <input
              type="text"
              value={updatedInvoice.customerName}
              onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, customerName: e.target.value })}
              className="border p-2 w-full"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Khu</label>
            <select
              value={updatedInvoice.area}
              onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, area: e.target.value })}
              className="border p-2 w-full"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Số bàn</label>
            <input
              type="text"
              value={updatedInvoice.tableNumber}
              onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, tableNumber: e.target.value })}
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Ngày xuất hoá đơn</label>
            <input
              type="date"
              value={format(new Date(updatedInvoice.date), 'yyyy-MM-dd')}
              onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, date: e.target.value })}
              className="border p-2 w-full"
            />
          </div>

          <h3 className="text-xl font-semibold mb-2">Danh sách món ăn</h3>
          <table className="min-w-full bg-white border mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Tên món</th>
                <th className="py-2 px-4 border">Số lượng</th>
                <th className="py-2 px-4 border">Giá</th>
                <th className="py-2 px-4 border">Thành tiền</th>
                <th className="py-2 px-4 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {updatedInvoice.selectedItems.map(item => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border">{item.itemName}</td>
                  <td className="py-2 px-4 border">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item._id, parseInt(e.target.value))}
                      className="border p-2 w-16 text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border text-right">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td className="py-2 px-4 border text-right">{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td className="py-2 px-4 border text-center">
                    <button onClick={() => handleDeleteItem(item._id)} className="text-red-500">Xoá</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Tổng tiền: {updatedInvoice.total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Thêm món
          </button>

          <button
            onClick={handleUpdateInvoice}
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
          >
            Lưu thay đổi
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-2">Thêm món ăn</h3>
            <input
              type="text"
              placeholder="Tìm món ăn"
              value={searchMenu}
              onChange={(e) => setSearchMenu(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Tên món</th>
                  <th className="py-2 px-4 border">Giá</th>
                  <th className="py-2 px-4 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredMenuItems.map(item => (
                  <tr key={item._id}>
                    <td className="py-2 px-4 border">{item.itemName}</td>
                    <td className="py-2 px-4 border text-right">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td className="py-2 px-4 border text-center">
                      <button onClick={() => handleAddItem(item)} className="text-green-500">Thêm</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateInvoice;
