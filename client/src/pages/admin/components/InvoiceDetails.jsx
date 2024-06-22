import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  Container, Button, Typography, List, ListItem, ListItemText, Divider, Paper, Box,
  MenuItem as MuiMenuItem, Select as MuiSelect, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField
} from '@mui/material';
import { format, parseISO } from 'date-fns'; // Thêm thư viện date-fns

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const VAT_RATE = 0.1; // 10% VAT
const LOGO_URL = 'https://madamelan.vn/storage/logo-favicon/logo.png'; // Replace with your logo's URL

const ITEMS_PER_PAGE = 8; // Số lượng món ăn trên mỗi trang

const InvoiceDetails = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [currentArea, setCurrentArea] = useState('');
  const [currentTable, setCurrentTable] = useState('');
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedTables, setSelectedTables] = useState({});
  const [openInvoice, setOpenInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [customerName, setCustomerName] = useState('Khách lẻ');
  const [searchTerm, setSearchTerm] = useState('');
  const [customerNames, setCustomerNames] = useState({});
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    fetchTables();
    fetchMenuItems();
    loadSelectedTables();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedTables', JSON.stringify(selectedTables));
  }, [selectedTables]);

  const updateCustomerNameForTable = (tableKey, name) => {
    setCustomerNames(prevState => ({
      ...prevState,
      [tableKey]: name
    }));
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/tables');
      setTables(response.data);
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

  const loadSelectedTables = () => {
    const savedTables = localStorage.getItem('selectedTables');
    if (savedTables) {
      try {
        setSelectedTables(JSON.parse(savedTables));
      } catch (error) {
        console.error('Error parsing selected tables:', error);
      }
    }
  };

  const handleAreaChange = (e) => {
    setCurrentArea(e.target.value);
    setCurrentTable('');
  };

  const handleTableChange = (e) => {
    setCurrentTable(e.target.value);
    const tableKey = `${currentArea}-${e.target.value}`;
    setSelectedItems(selectedTables[tableKey] || {});
  };

  const handleItemChange = (itemId, quantity) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [itemId]: { ...menuItems.find(item => item._id === itemId), quantity: quantity || 1 },
    }));
  };

  const handleAddItems = () => {
    const tableKey = `${currentArea}-${currentTable}`;
    const updatedTables = { ...selectedTables };
    updatedTables[tableKey] = { ...updatedTables[tableKey], ...selectedItems };
    setSelectedTables(updatedTables);
    setSelectedItems({}); // Reset selected items after adding to table
  };

  const handleRemoveItem = (tableKey, itemId) => {
    const updatedTables = { ...selectedTables };
    if (updatedTables[tableKey] && updatedTables[tableKey][itemId]) {
      delete updatedTables[tableKey][itemId];
      if (Object.keys(updatedTables[tableKey]).length === 0) {
        delete updatedTables[tableKey]; // Remove table if no items left
      }
      setSelectedTables(updatedTables);
    }
  };

  const calculateTotalPrice = (tableKey) => {
    if (!selectedTables[tableKey]) return 0;
    return Object.values(selectedTables[tableKey]).reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateVAT = (total) => total * VAT_RATE;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleDeleteTable = (tableKey) => {
    const updatedTables = { ...selectedTables };
    delete updatedTables[tableKey];
    setSelectedTables(updatedTables);
  };

  const generateBill = (tableKey) => {
    const table = tables.find(table => `${table.area}-${table.tableNumber}` === tableKey);
    const items = Object.values(selectedTables[tableKey]);
    const total = calculateTotalPrice(tableKey);
    const vat = calculateVAT(total);
    const totalWithVAT = total + vat;
    const currentDate = new Date(); // Lấy thời gian hiện tại
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss'); // Định dạng ngày thành chuỗi 'yyyy-MM-dd HH:mm:ss'
    const formattedDisplayDate = format(currentDate, 'HH:mm:ss dd/MM/yyyy'); // Định dạng ngày để hiển thị
    const currentCustomerName = customerNames[tableKey] || "Khách lẻ"; // Sử dụng tên khách hàng của bàn tương ứng
    setInvoiceData({
      table,
      items,
      total,
      vat,
      totalWithVAT,
      currentUser,
      date: formattedDate,
      displayDate: formattedDisplayDate,
      customerName: currentCustomerName
    });
    setOpenInvoice(true);
  };

  const handleCloseInvoice = () => {
    setOpenInvoice(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách menuItems dựa trên từ khóa tìm kiếm
  const filteredMenuItems = menuItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính số trang
  const totalPages = Math.ceil(filteredMenuItems.length / ITEMS_PER_PAGE);

  // Cắt danh sách menuItems thành các trang
  const paginatedMenuItems = filteredMenuItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  

  const exportPDF = async () => {
    try {
        // Convert the invoice date to the format required by your backend
        const formattedDate = format(parseISO(invoiceData.date), 'yyyy-MM-dd'); // Chuyển đổi ngày từ địa phương sang định dạng ISO

        // Send invoice data to the backend and get the response
        const response = await axios.post('http://localhost:3000/api/v1/invoices', {
            area: invoiceData.table?.area,
            tableNumber: invoiceData.table?.tableNumber,
            date: formattedDate,
            total: invoiceData.totalWithVAT,
            username: invoiceData.currentUser?.username,
            customerName: invoiceData.customerName,
            selectedItems: invoiceData.items
        });

        // Get the invoice ID from the response
        const invoiceId = response.data._id; // Assuming your backend returns the invoice ID as '_id'

        // Proceed with PDF export after successful backend save
        const tableData = invoiceData.items.map(item => {
            return [item.itemName, item.quantity, formatCurrency(item.price), formatCurrency(item.price * item.quantity)];
        });

        // Define QR code data (e.g., payment URL)
        const paymentUrl = `http://localhost:3000/payment/${invoiceId}`;


        const documentDefinition = {
            content: [
                { text: 'Hóa Đơn Thanh Toán', style: 'title' },
                { text: 'Nhà hàng Madame Lân', style: 'subtitle' },
                'Địa chỉ: Số 04 Bạch Đằng, Phường, Quận Hải Châu, TP. Đà Nẵng',
                'PHIẾU THANH TOÁN',
                { text: `Khu: ${invoiceData.table?.area}`, margin: [0, 10, 0, 0] },
                { text: `Bàn: ${invoiceData.table?.tableNumber}`, margin: [0, 5, 0, 0] },
                { text: `Nhân viên thu ngân: ${invoiceData.currentUser?.username}`, margin: [0, 5, 0, 0] },
                { text: `Tên khách hàng: ${invoiceData.customerName}`, margin: [0, 5, 0, 0] },
                { text: `Ngày: ${invoiceData.displayDate}`, margin: [0, 5, 5, 20] },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto', 'auto', 'auto'],
                        body: [
                            ['Tên món', 'Số lượng', 'Đơn giá', 'Thành tiền'],
                            ...tableData,
                            [{ text: 'Tổng tiền', colSpan: 3, alignment: 'right', bold: true }, {}, {}, formatCurrency(invoiceData.total)],
                            [{ text: 'VAT (10%)', colSpan: 3, alignment: 'right', bold: true }, {}, {}, formatCurrency(invoiceData.vat)],
                            [{ text: 'Tổng tiền (đã bao gồm VAT)', colSpan: 3, alignment: 'right', bold: true }, {}, {}, formatCurrency(invoiceData.totalWithVAT)]
                        ]
                    }
                },
                { text: 'Scan mã QR để thanh toán:', margin: [0, 30, 0, 0], alignment: 'center' },
                { qr: paymentUrl, fit: '100', margin: [0, 5, 0, 0], alignment: 'center' }, // Adjust 'fit' as necessary for QR code size
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
                    fontSize: 14,
                    alignment: 'center',
                    margin: [0, 0, 0, 5]
                }
            }
        };

        pdfMake.createPdf(documentDefinition).download(`hoa_don_${invoiceData.table?.area}_${invoiceData.table?.tableNumber}_${invoiceData.displayDate}.pdf`);

        // Clear selected items for the table
        handleDeleteTable(`${invoiceData.table?.area}-${invoiceData.table?.tableNumber}`);
        setOpenInvoice(false);
    } catch (error) {
        console.error('Error exporting PDF:', error);
    }
};



  return (
    <Container>
      <Typography variant="h4" gutterBottom className="text-center title-1 title-font">Hệ thống thanh toán</Typography>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>Chọn khu vực và bàn</Typography>
        <MuiSelect value={currentArea} onChange={handleAreaChange} displayEmpty>
          <MuiMenuItem value="" disabled>Chọn khu vực</MuiMenuItem>
          {Array.from(new Set(tables.map(table => table.area))).map(area => (
            <MuiMenuItem key={area} value={area}>{area}</MuiMenuItem>
          ))}
        </MuiSelect>
        <MuiSelect value={currentTable} onChange={handleTableChange} displayEmpty disabled={!currentArea}>
          <MuiMenuItem value="" disabled>Chọn bàn</MuiMenuItem>
          {tables.filter(table => table.area === currentArea).map(table => (
            <MuiMenuItem key={table.tableNumber} value={table.tableNumber}>{table.tableNumber}</MuiMenuItem>
          ))}
        </MuiSelect>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>Chọn món ăn</Typography>
        <Box sx={{ marginBottom: 1 }}>
          <TextField
            label="Tìm kiếm món ăn"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </Box>
        <Box display="flex" flexWrap="wrap">
          {paginatedMenuItems.map(item => (
            <Box key={item._id} sx={{ margin: 1 }}>
              <Typography>{item.itemName}</Typography>
              <TextField
                type="number"
                label="Số lượng"
                value={selectedItems[item._id]?.quantity || ''}
                onChange={(e) => handleItemChange(item._id, parseInt(e.target.value))}
                inputProps={{ min: 0 }}
                fullWidth
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Thêm nút điều hướng */}
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Trang trước</Button>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Trang tiếp theo</Button>
        </Box>
        <Button variant="contained" onClick={handleAddItems} disabled={!currentTable || Object.keys(selectedItems).length === 0}>
          Thêm vào bàn
        </Button>
      </Paper>

      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>Các bàn đã chọn</Typography>
        <List>
          {Object.keys(selectedTables).map(tableKey => {
            const [area, tableNumber] = tableKey.split('-');
            const customerName = customerNames[tableKey] || '';
            const totalPrice = formatCurrency(calculateTotalPrice(tableKey));
            return (
              <ListItem key={tableKey}>
                <ListItemText primary={`Khu: ${area} - Bàn: ${tableNumber}`} />
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <TextField
                    label="Tên khách hàng"
                    value={customerName}
                    onChange={(e) => updateCustomerNameForTable(tableKey, e.target.value)}
                    sx={{ flexBasis: '150px', marginRight: 1, marginBottom: 1 }}
                  />
                  <List sx={{ flexGrow: 1 }}>
                    {Object.values(selectedTables[tableKey]).map(item => (
                      <ListItem key={item._id}>
                        <ListItemText primary={`${item.itemName} - Số lượng: ${item.quantity}`} />
                        <Button variant="contained" size="small" color="secondary" onClick={() => handleRemoveItem(tableKey, item._id)}>Hủy</Button>
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="body2" sx={{ margin: '0 10px' }}>Tổng tiền: {totalPrice}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: 1 }}>
                    <Button variant="contained" size="small" color="secondary" onClick={() => handleDeleteTable(tableKey)}>Xóa</Button>
                    <Button variant="contained" size="small" color="primary" onClick={() => generateBill(tableKey)}>Xuất hóa đơn</Button>
                  </Box>
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Paper>
      <Dialog open={openInvoice} onClose={handleCloseInvoice}>
        <DialogTitle>Hóa đơn</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6">Nhà hàng Madame Lân</Typography>
              <Typography variant="subtitle1">Địa chỉ: Số 04 Bạch Đằng, Phường, Quận Hải Châu, TP. Đà Nẵng</Typography>
              <Typography variant="h6">PHIẾU THANH TOÁN</Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên món</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Đơn giá</TableCell>
                    <TableCell>Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceData.items?.map(item => (
                    <TableRow key={item._id}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.price)}</TableCell>
                      <TableCell>{formatCurrency(item.price * item.quantity)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">Tổng tiền</TableCell>
                    <TableCell>{formatCurrency(invoiceData.total)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="right">VAT (10%)</TableCell>
                    <TableCell>{formatCurrency(invoiceData.vat)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="right">Tổng tiền (đã bao gồm VAT)</TableCell>
                    <TableCell>{formatCurrency(invoiceData.totalWithVAT)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button onClick={handleCloseInvoice} color="primary">Đóng</Button>
            <Button onClick={exportPDF} color="primary" variant="contained">Xuất PDF</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InvoiceDetails;

