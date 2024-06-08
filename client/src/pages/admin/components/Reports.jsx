import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { cashOutline, peopleOutline } from 'ionicons/icons';
import axios from 'axios';

const Reports = () => {
  const [revenue, setRevenue] = useState(0);
  const [numEmployees, setNumEmployees] = useState(0);
  const [filters, setFilters] = useState('daily');
  const [selectedDate, setSelectedDate] = useState('');
  const [position, setPosition] = useState('Phục vụ');
  const [employeesByPosition, setEmployeesByPosition] = useState([]);
  const [numEmployeesByPosition, setNumEmployeesByPosition] = useState(0);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch revenue and invoices
        let url = `http://localhost:3000/api/v1/invoices/revenue?filter=${filters}`;
        if (filters === 'specificDate' && selectedDate) {
          url += `&date=${selectedDate}`;
        }
        const revenueResponse = await axios.get(url);
        setRevenue(revenueResponse.data.totalRevenue);
        setInvoices(revenueResponse.data.invoices);

        // Fetch total employees
        const employeesResponse = await axios.get('http://localhost:3000/api/v1/employees/count');
        setNumEmployees(employeesResponse.data.totalEmployees);

        // Fetch employees by position
        const employeesByPositionResponse = await axios.get(`http://localhost:3000/api/v1/employees/by-position?position=${position}`);
        setNumEmployeesByPosition(employeesByPositionResponse.data.totalEmployeesByPosition);
        setEmployeesByPosition(employeesByPositionResponse.data.employees);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [filters, selectedDate, position]);

  const formattedRevenue = revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Thống kê</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <IonIcon icon={cashOutline} className="text-4xl text-green-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Doanh thu</h2>
              <p className="text-3xl font-bold">{formattedRevenue}</p>
            </div>
          </div>
          <select
            className="p-2 border border-gray-300 rounded-md mb-2"
            value={filters}
            onChange={(e) => setFilters(e.target.value)}
          >
            <option value="daily">Hôm nay</option>
            <option value="weekly">Một tuần</option>
            <option value="monthly">Một tháng</option>
            <option value="quarterly">Ba tháng</option>
            <option value="yearly">Năm</option>
            <option value="specificDate">Chọn ngày</option>
          </select>
          {filters === 'specificDate' && (
            <input
              type="date"
              className="p-2 border border-gray-300 rounded-md"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <IonIcon icon={peopleOutline} className="text-4xl text-blue-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Số lượng nhân viên ở vị trí {position}</h2>
              <p className="text-3xl font-bold">{numEmployeesByPosition}</p>
            </div>
          </div>
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="Phục vụ">Phục vụ</option>
            <option value="Tiếp thực">Tiếp thực</option>
            <option value="Lễ tân">Lễ tân</option>
            <option value="Chảo chính">Chảo chính</option>
            <option value="Phụ thớt">Phụ thớt</option>
            <option value="Bếp nướng">Bếp nướng</option>
            <option value="Nấu món ăn sáng">Nấu món ăn sáng</option>
            <option value="Bảo trì">Bảo trì</option>
            <option value="Nấu xôi chè">Nấu xôi chè</option>
            <option value="Quầy (bán món ăn sáng)">Quầy (bán món ăn sáng)</option>
            <option value="Sơ chế nguyên liệu">Sơ chế nguyên liệu</option>
            <option value="Thủ kho">Thủ kho</option>
            <option value="Pha chế">Pha chế</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Hóa đơn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {invoices.map((invoice) => (
            <div key={invoice._id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Bàn: {invoice.tableNumber}</h3>
              <p>Khu vực: {invoice.area}</p>
              <p>Ngày: {new Date(invoice.date).toLocaleDateString('vi-VN')}</p>
              <p>Tổng: {invoice.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Nhân viên</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employeesByPosition.map((employee) => (
            <div key={employee._id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Tên: {employee.name}</h3>
              <p>Ngày sinh: {new Date(employee.dob).toLocaleDateString('vi-VN')}</p>
              <p>Giới tính: {employee.gender}</p>
              <p>Vị trí: {employee.position}</p>
              <p>Ngày bắt đầu: {new Date(employee.startDate).toLocaleDateString('vi-VN')}</p>
              <p>Số điện thoại: {employee.phone}</p>
              <p>Email: {employee.email}</p>
              <p>Địa chỉ: {employee.address}</p>
              <p>Trạng thái: {employee.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
