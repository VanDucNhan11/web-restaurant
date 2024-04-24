import React from 'react'
import './Reservations.css'

const Reservations = () => {
  return (
    <div className="datban flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl text-center text-white mt-20">Đặt lịch trực tuyến</h1>
      <h3 className="text-center italic text-white">Trang chủ/đặt chỗ</h3>
      <div className="flex flex-wrap justify-center mt-20 gap-4 px-4 sm:px-0">
        <div className="p-5 bg-white rounded-xl border-2 w-full sm:w-72">
          <div className="mb-2">Họ và tên</div>
          <input type="text" className="w-full p-2 border rounded" placeholder="Họ và tên" name="full_name" required />
        </div>
        <div className="p-5 bg-white rounded-xl border-2 mt-4 sm:mt-0 w-full sm:w-72">
          <div className="mb-2">Email</div>
          <input type="text" className="w-full p-2 border rounded" placeholder="Email" required />
        </div>
        <div className="p-5 bg-white rounded-xl border-2 mt-4 sm:mt-0 w-full sm:w-72">
          <div className="mb-2">Số điện thoại</div>
          <input type="text" className="w-full p-2 border rounded" placeholder="Số điện thoại" required />
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-5 gap-4 px-4 sm:px-0">
        <div className="p-5 bg-white rounded-xl border-2 w-full sm:w-72">
          <div className="mb-2">Ngày</div>
          <input
            type="date"
            className="w-full p-2 border rounded"
            placeholder="date"
            name="full_name"
            required
            value={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="p-5 bg-white rounded-xl border-2 mt-4 sm:mt-0 w-full sm:w-72">
          <div className="mb-2">Thời gian</div>
          <input
            type="time"
            className="w-full p-2 border rounded"
            placeholder="time"
            required
            value={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          />
        </div>
        <div className="p-5 bg-white rounded-xl border-2 mt-4 sm:mt-0 w-full sm:w-72">
          <div className="mb-2">số người</div>
          <input type="text" className="w-full p-2 border rounded" placeholder="số người" required />
        </div>
      </div>
      <div className="max-w-screen-lg p-5 bg-cover bg-no-repeat bg-center mt-5 rounded-xl border-2 bg-white">
        <div className="label">Yêu cầu đặt biệt</div>
        <textarea className="w-full p-2 border rounded" id="" cols="30" rows="4" name="content" />
      </div>
      <button className="mt-10 bg-red-500 text-white px-4 py-2 rounded-full border-2 border-red-600 hover:bg-red-600 hover:border-red-700 hover:text-white mb-10">Hoàn Thành</button>
    </div>
  )
}

export default Reservations