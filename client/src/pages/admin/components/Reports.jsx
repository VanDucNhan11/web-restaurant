import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { cashOutline, peopleOutline } from 'ionicons/icons';
import axios from 'axios';

const Revenue = ({ filters, selectedDate, revenue, invoices, setFilters, setSelectedDate, showEmployeeStats }) => {
  const formattedRevenue = revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return (
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
        <div className="items-center gap-6 mb-6">
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
            <div className="flex items-center mb-4 w-full">
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
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Hóa đơn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {invoices.map((invoice) => (
              <div key={invoice._id} className="bg-white shadow-md           rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Bàn: {invoice.tableNumber}</h3>
              <p>Khu vực: {invoice.area}</p>
              <p>Ngày: {new Date(invoice.date).toLocaleDateString('vi-VN')}</p>
              <p>Tên khách hàng: {invoice.customerName}</p>
              <p>Tổng: {invoice.total ? invoice.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

const EmployeesByPosition = ({ position, employeesByPosition, showRevenueStats }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-2">Nhân viên theo chức vụ</h2>
    <select
      className="p-2 border border-gray-300 rounded-md mb-2"
      value={position}
      onChange={(e) => setPosition(e.target.value)}
    >
      <option value="Phục vụ">Phục vụ</option>
      <option value="Tiếp thực">Tiếp thực</option>
      {/* Thêm các option khác tương ứng với các chức vụ */}
    </select>
    <div>
      {employeesByPosition.map((employee) => (
        <div key={employee._id} className="flex items-center mb-4">
          <p>{employee.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const Reports = () => {
  const [revenue, setRevenue] = useState(0);
  const [filters, setFilters] = useState('daily');
  const [selectedDate, setSelectedDate] = useState('');
  const [position, setPosition] = useState('Phục vụ');
  const [invoices, setInvoices] = useState([]);
  const [employeesByPosition, setEmployeesByPosition] = useState([]);
  const [showRevenue, setShowRevenue] = useState(true);

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
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [filters, selectedDate, position]);

  useEffect(() => {
    const fetchEmployeesByPosition = async () => {
      try {
        const positionResponse = await axios.get(`http://localhost:3000/api/v1/employees?position=${position}`);
        setEmployeesByPosition(positionResponse.data);
      } catch (error) {
        console.error('Error fetching employees by position', error);
      }
    };

    fetchEmployeesByPosition();
  }, [position]);

  const showEmployeeStats = () => {
    setShowRevenue(false);
  };

  const showRevenueStats = () => {
    setShowRevenue(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Thống kê</h1>
      <div className="flex justify-center mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4" onClick={showRevenueStats}>
          Thống kê doanh thu
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={showEmployeeStats}>
          Thống kê nhân viên
        </button>
      </div>
      {showRevenue ? (
        <Revenue
          filters={filters}
          selectedDate={selectedDate}
          revenue={revenue}
          invoices={invoices}
          setFilters={setFilters}
          setSelectedDate={setSelectedDate}
          showEmployeeStats={showEmployeeStats}
          />
        ) : (
          <EmployeesByPosition
            position={position}
            employeesByPosition={employeesByPosition}
            showRevenueStats={showRevenueStats}
          />
        )}
      </div>
    );
  };
  
export default Reports;
