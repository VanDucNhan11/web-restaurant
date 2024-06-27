import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [reservationData, setReservationData] = useState(null); // State để lưu thông tin đặt bàn
  const depositAmount = 100000; // Giá trị số tiền cần thanh toán

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('reservationData'));
    if (data) {
      setReservationData(data);
    }
  }, []);

  const handleMoMoPayment = async () => {
    if (!depositAmount || typeof depositAmount !== 'number' || depositAmount <= 0) {
      console.error('Invalid deposit amount');
      alert('Số tiền đặt cọc không hợp lệ.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/reservations/momo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: depositAmount }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to initiate MoMo payment: ${errorText}`);
      }

      const result = await response.json();
      
      if (result) {
        localStorage.setItem('reservationData', JSON.stringify(reservationData));
        window.location.href = result;
      } else {
        throw new Error('Invalid payment URL');
      }
    } catch (error) {
      console.error('Error processing MoMo payment:', error);
      alert('Có lỗi xảy ra khi thanh toán qua MoMo: ' + error.message);
    }
  };

  const handleZaloPayPayment = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/reservations/zalopay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Assuming data contains a URL to redirect the user for payment
        window.location.href = data.order_url; 
      } else {
        console.error('Payment initiation failed', data);
        alert('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  const handlePayment = async () => {
    if (paymentMethod === 'momo') {
      await handleMoMoPayment();
    } else if (paymentMethod === 'zalopay') {
      await handleZaloPayPayment();
    }
  };

  if (!reservationData) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col  items-center justify-center  bg-gray-100 py-10 px-4 ">
      <h1 className="text-4xl title-font  text-center  text-red-800">Thanh Toán Đặt Cọc</h1>
      <div className="flex flex-col lg:flex-row justify-center items-start w-full max-w-7xl mt-5 space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="reservation-info w-full   bg-white p-6 rounded-xl border border-gray-300 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Thông tin đặt bàn:</h2>
          <form className="flex ">
            <div className="mr-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                  Họ và tên:
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={reservationData.fullName}
                  readOnly
                  className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  value={reservationData.email}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Số điện thoại:
                </label>
                <input
                  id="phone"
                  type="text"
                  value={reservationData.phone}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookingDate">
                  Ngày đặt:
                </label>
                <input
                  id="bookingDate"
                  type="text"
                  value={reservationData.bookingDate}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookingTime">
                  Thời gian đặt:
                </label>
                <input
                  id="bookingTime"
                  type="text"
                  value={reservationData.bookingTime}
                  readOnly
                  className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfGuests">
                  Số người:
                </label>
                <input
                  id="numberOfGuests"
                  type="text"
                  value={reservationData.numberOfGuests}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {reservationData.selectedItems.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900">Món đã chọn:</h3>
                  <ul className="list-disc list-inside">
                    {reservationData.selectedItems.map(item => (
                      <li key={item._id} className="mt-2">
                        {item.itemName} - {item.price.toLocaleString('vi-VN')} VNĐ
                        <div className="ml-4">Số lượng: {item.quantity}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
          </form>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
              Yêu cầu đặc biệt:
            </label>
            <textarea
              id="note"
              value={reservationData.note}
              readOnly
              className="shadow appearance-none border rounded w-full h-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
  
        <div className="payment-methods w-full bg-white p-6 rounded-xl border border-gray-300 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Phương thức thanh toán</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="momo"
                checked={paymentMethod === 'momo'}
                onChange={() => setPaymentMethod('momo')}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="text-lg text-gray-700 pr-8">Thanh toán qua MoMo</span>
              <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png" alt="MoMo Icon" className="h-6 w-6" />
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="zalopay"
                checked={paymentMethod === 'zalopay'}
                onChange={() => setPaymentMethod('zalopay')}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="text-lg text-gray-700 pr-8">Thanh toán qua ZaloPay</span>
              <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png" alt="ZaloPay Icon" className="h-6 w-6" />
            </label>
          </div>
        </div>
  
        <div className="deposit-info w-full  bg-white p-6 rounded-xl border border-gray-300 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Thông tin đặt cọc</h2>
          <p className="text-lg text-gray-700">
            Số tiền: <span className="font-semibold">{depositAmount.toLocaleString('vi-VN')} VND</span>
          </p>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full mt-8"
          >
            Thanh Toán
          </button>
        </div>
      </div>
  
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate('/dat-cho')}
          className="text-gray-700 bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
        >
          Hủy Bỏ
        </button>
      </div>
    </div>
  );
}

export default Payment;
