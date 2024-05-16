import React from 'react';

const History = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Booking History</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm text-center">Ngày Đặt</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm text-center">Thời gian</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm text-center">Số bàn</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm text-center">Số khách</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-200 transition duration-200">
                <td className="w-1/5 py-3 px-4 text-center">2024-05-01</td>
                <td className="w-1/5 py-3 px-4 text-center">18:00</td>
                <td className="w-1/5 py-3 px-4 text-center">5</td>
                <td className="w-1/5 py-3 px-4 text-center">4</td>
                <td className="w-1/5 py-3 px-4 text-center text-green-500">Đã xác nhận</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
