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



const Reports = () => {
  const [revenue, setRevenue] = useState(0);
  const [filters, setFilters] = useState('daily');
  const [selectedDate, setSelectedDate] = useState('');
  const [position, setPosition] = useState('Phục vụ');
  const [invoices, setInvoices] = useState([]);
  const [employeeCountByPosition, setEmployeeCountByPosition] = useState(0);
  const [showRevenue, setShowRevenue] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        let url = `http://localhost:3000/api/v1/invoices/revenue?filter=${filters}`;
        if (filters === 'specificDate' && selectedDate) {
          url += `&date=${selectedDate}`;
        }
        const revenueResponse = await axios.get(url);
        setRevenue(revenueResponse.data.totalRevenue);
        setInvoices(revenueResponse.data.invoices);
      } catch (error) {
        console.error('Error fetching revenue data', error);
      }
    };

    fetchRevenueData();
  }, [filters, selectedDate]);

  const showRevenueStats = () => {
    setShowRevenue(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Thống kê</h1>
      <div className="flex justify-center mb-4">
      </div>
       
        <Revenue
          filters={filters}
          selectedDate={selectedDate}
          revenue={revenue}
          invoices={invoices}
          setFilters={setFilters}
          setSelectedDate={setSelectedDate}
        />
     
    </div>
  );
};

export default Reports;
