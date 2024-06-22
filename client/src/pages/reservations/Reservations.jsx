import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Reservations.css';

const Reservations = () => {
  const [message, setMessage] = useState(null);
  const currentUser = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState(JSON.parse(localStorage.getItem('selectedItems')) || []);
 

  

  const handleSelectFood = () => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    navigate('/thuc-don');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!currentUser) {
      console.error('User is not logged in');
      return;
    }
  
    const reservationData = {
      userID: currentUser._id,
      fullName: event.target.full_name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      bookingDate: event.target.bookingDate.value,
      bookingTime: event.target.bookingTime.value,
      numberOfGuests: event.target.numberOfGuests.value,
      note: event.target.content.value,
      selectedItems: selectedItems,
    };
  
    localStorage.setItem('reservationData', JSON.stringify(reservationData));
    console.log('Reservation data saved:', reservationData);
  
    navigate('/payment');
    console.log('Navigated to /payment');
  };
  
  const handleRemoveItem = (item) => {
    const updatedItems = selectedItems.filter(selectedItem => selectedItem._id !== item._id);
    setSelectedItems(updatedItems);
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (item, quantity) => {
    if (quantity < 1) return;
    const updatedItems = selectedItems.map(selectedItem => selectedItem._id === item._id ? { ...selectedItem, quantity } : selectedItem);
    setSelectedItems(updatedItems);
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
  };

  return (
    <div className="datban flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl text-center text-white mt-20">Đặt lịch trực tuyến</h1>
      <h3 className="text-center italic text-white">Trang chủ/đặt chỗ</h3>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mt-20 gap-4 px-4 sm:px-0">
        <div className="flex flex-wrap justify-between w-full gap-4">
          <div className="p-5 bg-white rounded-xl border-2 w-full sm:w-72">
            <div className="mb-2">Tên</div>
            <input type="text" className="w-full p-2 border rounded" placeholder="Họ và tên" name="full_name" required />
          </div>
          <div className="p-5 bg-white rounded-xl border-2 mt-4 sm:mt-0 w-full sm:w-72">
            <div className="mb-2">Email</div>
            <input type="text" className="w-full p-2 border rounded" placeholder="Email" name="email" required />
          </div>
          <div className="p-5 bg-white rounded-xl border-2 mt-4 sm:mt-0 w-full sm:w-72">
            <div className="mb-2">Số điện thoại</div>
            <input type="text" className="w-full p-2 border rounded" placeholder="Số điện thoại" name="phone" required />
          </div>
        </div>
        <div className="flex flex-wrap justify-between w-full gap-4">
          <div className="p-5 bg-white rounded-xl border-2 w-full sm:w-72">
            <div className="mb-2">Ngày</div>
            <input
                type="date"
                className="w-full p-2 border rounded"
                placeholder="date"
                name="bookingDate"
                required
                min={new Date().toISOString().split('T')[0]}
                defaultValue={new Date().toISOString().split('T')[0]}
              />
          </div>
          <div className="p-5 bg-white rounded-xl border-2 mt-4 sm:mt-0 w-full sm:w-72">
            <div className="mb-2">Thời gian</div>
            <input
              type="time"
              className="w-full p-2 border rounded"
              placeholder="time"
              name="bookingTime"
              required
              min="06:30"
              max="21:30"
            />
          </div>
          <div className="p-5 bg-white rounded-xl border-2 mt-4 sm:mt-0 w-full sm:w-72">
            <div className="mb-2">Số người</div>
            <input type="text" className="w-full p-2 border rounded" placeholder="số người" name="numberOfGuests" required />
          </div>
        </div>
        <div className="flex flex-wrap justify-between w-full gap-4">
          <div className="p-5 bg-white rounded-xl border-2 w-full ">
            <div className="label mb-2">Đặt món ăn</div>
            <button type="button" className="w-full p-2 border rounded bg-red-600 text-white" onClick={handleSelectFood}>
              Chọn món ăn
            </button>
            {selectedItems.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Món đã chọn:</h3>
                <ul>
                  {selectedItems.map(item => (
                    <li key={item._id}>
                      {item.itemName} - {item.price.toLocaleString('vi-VN')} VNĐ
                      <div className="flex items-center">
                        <label className="mr-2">Số lượng:</label>
                        <input
                          type="number"
                          className="w-16 p-1 border rounded"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item, parseInt(e.target.value, 10))}
                          min="1"
                        />
                        <button type="button" className="ml-2 text-red-500" onClick={() => handleRemoveItem(item)}>Hủy chọn</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="p-5 bg-white rounded-xl border-2 w-full">
            <div className="label mb-2">Yêu cầu đặc biệt</div>
            <textarea className="w-full p-2 border rounded" cols="30" rows="4" name="content" />
          </div>
        </div>
        <button type="submit" className="mt-10 mb-10 bg-red-500 text-white px-4 py-2 rounded-full border-2 border-red-600 hover:bg-red-600 hover:border-red-700 hover:text-white">Hoàn Thành</button>
        <div className="title-font text-4xl  mb-4 text-white">Hỗ trợ đặt bàn</div>
        <div className="flex items-center justify-center space-x-4 mb-10">
            <img src="https://madamelan.vn/themes/elegant/assets/images/phone-icon.png" alt="" />
            <div className="text-white text-xl title-font">0899 885 260</div>
        </div>
      </form>
      {message && <div className="mt-5 p-3 bg-green-500 text-white rounded">{message}</div>}
    </div>
  );
};

export default Reservations;
