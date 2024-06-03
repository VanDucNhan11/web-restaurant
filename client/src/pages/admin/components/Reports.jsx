import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonIcon } from '@ionic/react';
import { cashOutline } from 'ionicons/icons';
import { format } from 'date-fns';

const formatCurrencyVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const Reports = () => {
  const [revenue, setRevenue] = useState(0);
  const [invoices, setInvoices] = useState([]);
  const [timeFrame, setTimeFrame] = useState('daily');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchRevenue();
  }, [timeFrame, selectedDate]);

  const fetchRevenue = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/invoices/revenue', {
        params: {
          timeFrame,
          date: selectedDate
        }
      });
      setRevenue(response.data.totalRevenue);
      setInvoices(response.data.invoices);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    if (isValidDate(selectedDate)) {
        setSelectedDate(selectedDate);
    } else {
        console.error('Invalid date format');
    }
 };

 const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-fon">Reports</h1>
      <div className="mb-6 text-center">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border rounded"
        />
        <select value={timeFrame} onChange={handleTimeFrameChange} className="p-2 border rounded ml-4">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <IonIcon icon={cashOutline} className="text-4xl text-green-600 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Revenue</h2>
            <p className="text-3xl font-bold">{formatCurrencyVND(revenue)}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Invoices</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Area</th>
                <th className="py-2 px-4 border-b">Table Number</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Username</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice._id}>
                  <td className="py-2 px-4 border-b">{format(new Date(invoice.date), 'yyyy-MM-dd')}</td>
                  <td className="py-2 px-4 border-b">{invoice.area}</td>
                  <td className="py-2 px-4 border-b">{invoice.tableNumber}</td>
                  <td className="py-2 px-4 border-b">{formatCurrencyVND(invoice.total)}</td>
                  <td className="py-2 px-4 border-b">{invoice.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
