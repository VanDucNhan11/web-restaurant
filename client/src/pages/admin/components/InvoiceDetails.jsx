import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const InvoiceDetails = () => {
  const location = useLocation();
  const reservation = location.state?.reservation;
  const [tables, setTables] = useState([]);
  const [selectedArea, setSelectedArea] = useState('A');
  const [areas, setAreas] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tableOrders, setTableOrders] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [tableHasOrder, setTableHasOrder] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const currentUser = useSelector(state => state.user.currentUser);
  const [customerName, setCustomerName] = useState(reservation ? reservation.fullName : 'Khách lẻ');
  const [inputCustomerName, setInputCustomerName] = useState(reservation ? reservation.fullName : '');
  const [reservationApplied, setReservationApplied] = useState(false);
  
 


  useEffect(() => {
    fetchTables();
    fetchMenuItems();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/tables');
      if (!response.ok) {
        throw new Error('Failed to fetch tables');
      }
      const data = await response.json();

      const areas = [...new Set(data.map(table => table.area))];
      setTables(data);
      setAreas(areas);
    } catch (error) {
      console.error('Error fetching tables:', error);
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

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    setSelectedTable(null);
  };

  const handleCancelMenuItem = (menuItem) => {
    setSelectedMenuItems(selectedMenuItems.filter(item => item._id !== menuItem._id));
  };

  const handleTableClick = async (table) => {
    setSelectedTable(table);
    setShowMenu(true);

    if (reservation && !reservationApplied) {
      setInputCustomerName(reservation.fullName);
      setTableOrders((prevOrders) => ({
        ...prevOrders,
        [table._id]: reservation.selectedItems.map((item) => ({
          itemName: item.itemName,
          quantity: item.quantity,
          price: item.price
        }))
      }));
      setTableHasOrder(true);
      setReservationApplied(true);
      await updateTableStatus(table._id, 'Đang phục vụ'); // Cập nhật trạng thái bàn
    } else {
      if (!tableOrders[table._id]) {
        setTableOrders((prevOrders) => ({
          ...prevOrders,
          [table._id]: [],
        }));
        setTableHasOrder(false);
      } else {
        setTableHasOrder(true);
      }
    }

    setSelectedMenuItems(tableOrders[table._id] || []);
  };

  const updateTableStatus = async (tableId, status) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/tables/${tableId}`, { status });
      // Cập nhật trạng thái bàn trong danh sách bàn (nếu cần)
      setTables((prevTables) =>
        prevTables.map((table) =>
          table._id === tableId ? { ...table, status } : table
        )
      );
    } catch (error) {
      console.error('Failed to update table status', error);
    }
  };

  
  

  const handleMenuItemClick = (menuItem) => {
    const existingItem = selectedMenuItems.find(item => item._id === menuItem._id);
    if (existingItem) {
      // Nếu món ăn đã được chọn, chúng ta sẽ huỷ bỏ món này
      handleCancelMenuItem(menuItem);
    } else {
      setSelectedMenuItems([...selectedMenuItems, { ...menuItem, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (menuItem, quantity) => {
    setSelectedMenuItems(selectedMenuItems.map(item =>
      item._id === menuItem._id ? { ...item, quantity: Number(quantity) } : item
    ));
  };

  const addMenuItem = async () => {
    if (selectedTable && selectedMenuItems.length > 0) {
      try {
        await axios.patch(`http://localhost:3000/api/v1/tables/${selectedTable._id}`, {
          items: selectedMenuItems,
          status: 'Đang phục vụ' // Cập nhật trạng thái của bàn trên server
        });

        // Cập nhật lại trạng thái bàn trong state tables
        const updatedTables = tables.map(table => {
          if (table._id === selectedTable._id) {
            return {
              ...table,
              status: 'Đang phục vụ'
            };
          }
          return table;
        });

        setTables(updatedTables);
        setTableOrders((prevTableOrders) => ({
          ...prevTableOrders,
          [selectedTable._id]: selectedMenuItems,
        }));

        setSelectedMenuItems([]);
        setShowMenu(false);
        setTableHasOrder(true); // Đã cập nhật có order
      } catch (error) {
        console.error('Error adding menu items:', error);
      }
    }
  };

  const updateMenuItem = async () => {
    if (selectedTable && selectedMenuItems.length > 0) {
      try {
        await axios.patch(`http://localhost:3000/api/v1/tables/${selectedTable._id}`, {
          items: selectedMenuItems,
          status: 'Đang phục vụ' // Cập nhật trạng thái của bàn trên server
        });

        // Cập nhật lại trạng thái bàn trong state tables
        const updatedTables = tables.map(table => {
          if (table._id === selectedTable._id) {
            return {
              ...table,
              status: 'Đang phục vụ'
            };
          }
          return table;
        });

        setTables(updatedTables);
        setTableOrders((prevTableOrders) => ({
          ...prevTableOrders,
          [selectedTable._id]: selectedMenuItems,
        }));

        setSelectedMenuItems([]);
        setShowMenu(false);
        setTableHasOrder(true); // Đã cập nhật có order
      } catch (error) {
        console.error('Error updating menu items:', error);
      }
    }
  };

  const generateBill = () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    const formattedDisplayDate = format(currentDate, 'HH:mm:ss dd/MM/yyyy');
    const total = calculateTotal();
    const vat = calculateVAT(total, selectedTable.area);
    const totalWithVAT = total + vat;
    const customer = inputCustomerName !== '' ? inputCustomerName : 'Khách lẻ';
    
    setInvoiceData({
      table: selectedTable,
      items: tableOrders[selectedTable._id],
      total,
      vat,
      totalWithVAT,
      currentUser,
      customerName: customer,
      date: formattedDate,
      displayDate: formattedDisplayDate,
    });
  
    setOpenInvoice(true);
  };
  
  

  const calculateTotal = () => {
    if (selectedTable && tableOrders[selectedTable._id]) {
      return tableOrders[selectedTable._id].reduce((total, item) => total + item.price * item.quantity, 0);
    }
    return 0;
  };

  const calculateVAT = (total, area) => {
    return area === 'VIP' ? total * 0.15 : total * 0.10;
  };

  const exportPDF = async () => {
    try {
      if (!invoiceData) {
        throw new Error('Không có dữ liệu hóa đơn để xuất PDF');
      }
  
      console.log('Preparing to export PDF:', invoiceData);
  
      // Prepare table data for PDF content
      const tableData = invoiceData.items.map(item => ({
        itemName: item.itemName,
        price: item.price,
        quantity: item.quantity
      }));
      
      // Calculate total with VAT
      const totalWithVAT = invoiceData.total + invoiceData.vat;
  
      const documentDefinition = {
        content: [
          { text: 'Hóa Đơn Thanh Toán', style: 'title' },
          { text: 'Nhà hàng Madame Lân', style: 'subtitle' },
          'Địa chỉ: Số 04 Bạch Đằng, Phường, Quận Hải Châu, TP. Đà Nẵng',
          'PHIẾU THANH TOÁN',
          { text: `Khu: ${invoiceData.table.area}`, margin: [0, 10, 0, 0] },
          { text: `Bàn: ${invoiceData.table.tableNumber}`, margin: [0, 5, 0, 0] },
          { text: `Nhân viên thu ngân: ${invoiceData.currentUser.username}`, margin: [0, 5, 0, 0] },
          { text: `Tên khách hàng: ${invoiceData.customerName}`, margin: [0, 5, 0, 0] },
          { text: `Ngày: ${invoiceData.displayDate}`, margin: [0, 5, 0, 20] },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto'],
              body: [
                ['Tên món', 'Số lượng', 'Đơn giá', 'Thành tiền'],
                ...tableData.map(item => [
                  item.itemName,
                  item.quantity,
                  formatCurrency(item.price),
                  formatCurrency(item.price * item.quantity)
                ]),
                [{ text: 'Tổng tiền', colSpan: 3, alignment: 'right', bold: true }, {}, {}, formatCurrency(invoiceData.total)],
                [{ text: `VAT (${invoiceData.table.area === 'VIP' ? '15%' : '10%'})`, colSpan: 3, alignment: 'right', bold: true }, {}, {}, formatCurrency(invoiceData.vat)],
                [{ text: 'Tổng tiền (đã bao gồm VAT)', colSpan: 3, alignment: 'right', bold: true }, {}, {}, formatCurrency(totalWithVAT)]
              ]
            }
          },
          { text: 'Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!', margin: [0, 10, 0, 0], alignment: 'center' },
          { text: 'Hẹn gặp lại ở Nhà hàng Madame Lân!', margin: [0, 5, 0, 0], alignment: 'center' }
        ],
        styles: {
          title: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          subtitle: {
            fontSize: 16,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          }
        }
      };
  
      console.log('Document definition:', documentDefinition);
  
      // Generate and download PDF
      const pdfDoc = pdfMake.createPdf(documentDefinition);
      pdfDoc.download(`HoaDon_${invoiceData.table.tableNumber}_${invoiceData.displayDate}.pdf`);
  
      // Save invoice to MongoDB via API
      await fetch('http://localhost:3000/api/v1/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area: invoiceData.table.area,
          tableNumber: invoiceData.table.tableNumber,
          date: invoiceData.date,
          total: totalWithVAT, // Save total including VAT
          username: invoiceData.currentUser.username,
          customerName: invoiceData.customerName,
          selectedItems: tableData
        }),
      });
      // Update table status via API call
      await axios.patch(`http://localhost:3000/api/v1/tables/${selectedTable._id}`, {
        status: 'Còn Trống' 
      });
  
      // Reset local state
      const updatedTables = tables.map(table => {
        if (table._id === selectedTable._id) {
          return {
            ...table,
            status: 'Còn trống'
          };
        }
        return table;
      });
  
      setTables(updatedTables);
      setTableOrders(prevTableOrders => ({
        ...prevTableOrders,
        [selectedTable._id]: []
      }));
  
      setSelectedMenuItems([]);
      setShowMenu(false);
      setTableHasOrder(false);
      setOpenInvoice(false);
      setInvoiceData(null);
      setInputCustomerName('');
  
      console.log('PDF exported successfully and invoice saved to MongoDB');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      // Handle error, e.g., show user-friendly error message
    }
  };
  
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleInvoiceClose = () => {
    setOpenInvoice(false);
    setInvoiceData(null);
  };

  const renderMenuItems = () => {
    return (
      <div className={`mt-6 ${showMenu && selectedTable ? 'block' : 'hidden'}`}>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            className="border border-gray-300 px-3 py-2 rounded-md mr-4 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            onClick={tableHasOrder ? updateMenuItem : addMenuItem}
            disabled={selectedMenuItems.length === 0}
          >
            {tableHasOrder ? 'Cập nhật' : 'Thêm vào bàn'}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {menuItems
            .filter((item) => item.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((item) => (
              <div
                key={item._id}
                className={`relative flex flex-col items-center border border-gray-300 p-4 rounded-md cursor-pointer ${selectedMenuItems.find(selectedItem => selectedItem._id === item._id) ? 'bg-green-100' : ''}`}
                onClick={() => handleMenuItemClick(item)}
              >
                <img
                  src={`http://localhost:3000/${item.image}`}
                  alt={item.itemName}
                  className="mb-2"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <div className="text-center">{item.itemName}</div>
                <div className="text-center font-bold">{formatCurrency(item.price)}</div>
                {selectedMenuItems.find(selectedItem => selectedItem._id === item._id) && (
                  <>
                    <input
                      type="number"
                      min="1"
                      value={selectedMenuItems.find(selectedItem => selectedItem._id === item._id).quantity}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      className="mt-2 border border-gray-300 rounded-md px-2 py-1"
                      onClick={(e) => e.stopPropagation()} // Ngăn việc click vào input làm bỏ chọn món
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md"
                      onClick={(e) => { e.stopPropagation(); handleCancelMenuItem(item); }}
                      >
                        Huỷ
                      </button>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      );
    };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-7xl mt-10">
        <div className="flex">
          <div className="w-1/4">
            <div className="text-lg font-bold mb-4">Khu</div>
            {areas.map((area) => (
              <button
                key={area}
                className={`block w-full p-4 bg-blue-500 text-white rounded-md mb-4 text-left ${selectedArea === area ? 'bg-blue-700' : ''}`}
                onClick={() => handleAreaClick(area)}
              >
                {area}
              </button>
            ))}
          </div>
          <div className="ml-10 w-3/4">
            {selectedArea && (
              <div className="bg-gray-200 rounded-md p-4">
                <div className="text-lg font-bold mb-4">Bàn ở Khu {selectedArea}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-4">
                  {tables
                    .filter((table) => table.area === selectedArea)
                    .map((table) => (
                      <div
                        key={table._id}
                        className={`transition transform hover:scale-105 hover:shadow-xl rounded-lg p-6 flex flex-col items-center mb-6 cursor-pointer ${table.status === 'Đang phục vụ' ? 'bg-red-300' : 'bg-green-400'}`}
                        onClick={() => handleTableClick(table)}
                      >
                        <div className="text-3xl font-bold ">{table.tableNumber}</div>
                        <div className="text-lg mb-1">{table.status}</div>
                        <div className="text-md">Số ghế: {table.quantity}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {selectedTable && (
              <div className="bg-white rounded-md p-6 mt-10 shadow-md">
                <div className="text-lg font-bold mb-4">Thông tin Bàn  </div>
                <div className="text-lg font-bold mb-4">Khu: {selectedTable.area} - Bàn số: {selectedTable.tableNumber} </div>
                <div className="mb-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên khách hàng:
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 px-3 py-2 rounded-md w-64"
                      value={inputCustomerName}
                      onChange={(e) => setInputCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="text-lg font-semibold">Các món ăn đã chọn</div>
                  {tableOrders[selectedTable._id] && tableOrders[selectedTable._id].length === 0 ? (
                    <div>Chưa có món ăn nào</div>
                  ) : (
                    <ul>
                      {tableOrders[selectedTable._id].map((item) => (
                        <li key={item._id} className="flex justify-between my-2">
                          <div>{item.itemName} x {item.quantity}</div>
                          <div>{formatCurrency(item.price * item.quantity)}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="text-lg font-semibold mb-4">Tổng tiền: {formatCurrency(calculateTotal())}</div>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-4 mr-5" onClick={() => setSelectedTable(null)}>Đóng</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={generateBill}>Xuất hoá đơn</button>  
              </div>
            )}
          </div>
        </div>
      </div>
      
      {openInvoice && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-md p-8 max-w-3xl w-full">
            <div className="text-xl font-bold mb-4">Hóa đơn thanh toán</div>
            <div className="mb-4">
              <div className="text-lg">Nhà hàng Madame Lân</div>
              <div>Địa chỉ: Số 04 Bạch Đằng, Phường, Quận Hải Châu, TP. Đà Nẵng</div>
            </div>
            <div className="mb-4">
              <div className="text-lg font-semibold mb-2">Thông tin hóa đơn</div>
              <div><span className="font-semibold">Khu:</span> {invoiceData.table.area}</div>
              <div><span className="font-semibold">Bàn:</span> {invoiceData.table.tableNumber}</div>
              <div><span className="font-semibold">Ngày:</span> {invoiceData.displayDate}</div>
              <div><span className="font-semibold">Nhân viên thu ngân:</span> {invoiceData.currentUser.username}</div>
              <div><span className="font-semibold">Tên khách hàng:</span> {invoiceData.customerName}</div>
            </div>
            <div className="mb-4">
              <div className="text-lg font-semibold mb-2">Các món đã chọn</div>
              {invoiceData.items.map((item) => (
                <div key={item._id} className="flex justify-between my-1">
                  <div>{item.itemName} x {item.quantity}</div>
                  <div>{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <div className="flex justify-between font-semibold">
                <div>Tổng tiền:</div>
                <div>{formatCurrency(invoiceData.total)}</div>
              </div>
              <div className="flex justify-between font-semibold">
                <div>VAT ({invoiceData.table.area === 'VIP' ? '15%' : '10%'}):</div>
                <div>{formatCurrency(invoiceData.vat)}</div>
              </div>
              <div className="flex justify-between font-semibold">
                <div>Tổng tiền (đã bao gồm VAT):</div>
                <div>{formatCurrency(invoiceData.totalWithVAT)}</div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-4" onClick={exportPDF}>Xuất PDF</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handlePrint}>In hóa đơn</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md ml-4" onClick={handleInvoiceClose}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {renderMenuItems()}
    </div>
  );
};

export default InvoiceDetails;

