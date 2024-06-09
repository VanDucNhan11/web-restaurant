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

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTables();
    fetchMenuItems();
    loadSelectedTables();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('selectedTables', JSON.stringify(selectedTables));
  }, [selectedTables]);

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
    const savedTables = sessionStorage.getItem('selectedTables');
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
    setSelectedItems(selectedTables[e.target.value] || {});
  };

  const handleItemChange = (itemId, quantity) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [itemId]: { ...menuItems.find(item => item._id === itemId), quantity: quantity || 1 },
    }));
  };

  const handleAddItems = () => {
    const updatedTables = { ...selectedTables };
    updatedTables[currentTable] = { ...updatedTables[currentTable], ...selectedItems };
    setSelectedTables(updatedTables);
    setSelectedItems({}); // Reset selected items after adding to table
  };

  const calculateTotalPrice = (tableId) => {
    if (!selectedTables[tableId]) return 0;
    return Object.values(selectedTables[tableId]).reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleDeleteTable = (tableId) => {
    const updatedTables = { ...selectedTables };
    delete updatedTables[tableId];
    setSelectedTables(updatedTables);
  };

  const generateBill = (tableId) => {
    const table = tables.find(table => table.tableNumber === parseInt(tableId));
    const items = Object.values(selectedTables[tableId]);
    const total = calculateTotalPrice(tableId);
    const currentDate = new Date().toLocaleString('vi-VN');
    setInvoiceData({ table, items, total, currentUser, date: currentDate });
    setOpenInvoice(true);
  };

  const handleCloseInvoice = () => {
    setOpenInvoice(false);
  };

  const exportPDF = async () => {
    try {
        // Gửi dữ liệu hoá đơn lên backend
        await axios.post('http://localhost:3000/api/v1/invoices', {
            area: invoiceData.table?.area,
            tableNumber: invoiceData.table?.tableNumber,
            date: invoiceData.date,
            total: invoiceData.total,
            username: invoiceData.currentUser?.username
        });

        // Sau khi dữ liệu đã được lưu thành công, tiếp tục xuất PDF
        const tableData = invoiceData.items.map(item => {
            return [item.itemName, item.quantity, formatCurrency(item.price), formatCurrency(item.price * item.quantity)];
        });

        const documentDefinition = {
            content: [
                { text: 'Hóa Đơn Thanh Toán', style: 'title' },
                { text: 'Nhà hàng Madame Lân', style: 'subtitle' },
                '06 Tân Kỳ Tân Quý, P.15, Q.Tân Bình, HCM',
                'PHIẾU THANH TOÁN',
                { text: `Khu: ${invoiceData.table?.area}`, margin: [0, 10, 0, 0] },
                { text: `Bàn: ${invoiceData.table?.tableNumber}`, margin: [0, 5, 0, 0] },
                { text: `Nhân viên: ${invoiceData.currentUser?.username}`, margin: [0, 5, 0, 0] },
                { text: `Ngày: ${invoiceData.date}`, margin: [0, 5, 0, 20] },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto', 'auto', 'auto'],
                        body: [
                            ['Tên món', 'Số lượng', 'Đơn giá', 'Thành tiền'],
                            ...tableData,
                            [{ text: 'Tổng tiền', colSpan: 3, alignment: 'right', bold: true }, {}, {}, formatCurrency(invoiceData.total)]
                        ]
                    }
                }
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
                    bold: true,
                    alignment: 'center',
                    margin: [0, 0, 0, 10]
                }
            }
        };

        pdfMake.createPdf(documentDefinition).download(`hoa_don_ban_${invoiceData.table?.tableNumber}.pdf`);
    } catch (error) {
        console.error('Error exporting PDF:', error);
        // Xử lý lỗi khi gửi dữ liệu hoá đơn lên backend
    }
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="title-1 title-font text-center">Hệ thống thanh toán</Typography>
      <Typography variant="h6" gutterBottom>Vui lòng chọn khu khách đang ăn</Typography>
      <Box mb={2}>
        <MuiSelect
          value={currentArea}
          onChange={handleAreaChange}
          fullWidth
          displayEmpty
          inputProps={{ 'aria-label': 'Select area' }}
        >
          <MuiMenuItem value="" disabled>Chọn Khu</MuiMenuItem>
          {[...new Set(tables.map(table => table.area))].map(area => (
            <MuiMenuItem key={area} value={area}>{area}</MuiMenuItem>
          ))}
        </MuiSelect>
      </Box>
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>Chọn bàn số mấy:</Typography>
        <MuiSelect
          value={currentTable}
          onChange={handleTableChange}
          fullWidth
          displayEmpty
          inputProps={{ 'aria-label': 'Select table' }}
        >
          <MuiMenuItem value="" disabled>Số bàn</MuiMenuItem>
          {tables.filter(table => table.area === currentArea).map(table => (
            <MuiMenuItem key={table._id} value={table.tableNumber}>{table.tableNumber}</MuiMenuItem>
          ))}
        </MuiSelect>
      </Box>
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>Chọn món ăn khách đã oder:</Typography>
        <TextField
          label="Tìm kiếm món ăn"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <MuiSelect
          value=""
          onChange={(e) => handleItemChange(e.target.value, selectedItems[e.target.value]?.quantity || 1)}
          fullWidth
          displayEmpty
          inputProps={{ 'aria-label': 'Select menu item' }}
        >
          <MuiMenuItem value="" disabled>Chọn Món</MuiMenuItem>
          {filteredMenuItems.map(item => (
            <MuiMenuItem key={item._id} value={item._id}>
              {item.itemName} {selectedItems[item._id] ? `- Số lượng: ${selectedItems[item._id].quantity}` : ''}
            </MuiMenuItem>
          ))}
        </MuiSelect>
        {Object.keys(selectedItems).map(itemId => (
          <Box key={itemId} display="flex" alignItems="center" mt={1}>
            <ListItemText primary={selectedItems[itemId].itemName} />
            <TextField
              type="number"
              value={selectedItems[itemId].quantity}
              onChange={(e) => handleItemChange(itemId, parseInt(e.target.value))}
              inputProps={{ min: 1 }}
              sx={{ width: 50, ml: 2 }}
            />
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={handleAddItems} sx={{ mt: 1 }}>Add</Button>
      </Box>
      {Object.keys(selectedTables).map(tableId => {
        const table = tables.find(table => table.tableNumber === parseInt(tableId));
        if (!table) return null;
        return (
          <Paper key={tableId} elevation={3} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">
              Số bàn: {table.tableNumber} - Khu: {table.area}
            </Typography>
            <List>
              {Object.values(selectedTables[tableId]).map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${item.itemName} - Số lượng: ${item.quantity} - Đơn giá: ${formatCurrency(item.price)}`} />
                </ListItem>
              ))}
              <Divider />
              <ListItem>
                <ListItemText primary={`Tổng tiền: ${formatCurrency(calculateTotalPrice(tableId))}`} />
              </ListItem>
            </List>
            <Button variant="outlined" color="secondary" onClick={() => generateBill(tableId)} sx={{ marginRight: 3 }}>Xuất hoá đơn</Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDeleteTable(tableId)}>Xoá thông tin bàn</Button>
          </Paper>
        );
      })}
      <Dialog open={openInvoice} onClose={handleCloseInvoice} maxWidth="sm" fullWidth>
        <DialogTitle>Hóa Đơn Thanh Toán</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <Typography variant="h6" align="center">Nhà hàng Madame Lân</Typography>
            <Typography variant="subtitle1" align="center">06 Tân Kỳ Tân Quý, P.15, Q.Tân Bình, HCM</Typography>
            <Typography variant="body2" align="center">PHIẾU THANH TOÁN</Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body2">Khu: {invoiceData.table?.area}</Typography>
              <Typography variant="body2">Bàn: {invoiceData.table?.tableNumber}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body2">Nhân viên: {invoiceData.currentUser?.username}</Typography>
              <Typography variant="body2">Ngày: {invoiceData.date}</Typography>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên món</TableCell>
                    <TableCell align="right">Số lượng</TableCell>
                    <TableCell align="right">Đơn giá</TableCell>
                    <TableCell align="right">Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceData.items && invoiceData.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                      <TableCell align="right">{formatCurrency(item.price * item.quantity)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">Tổng tiền</TableCell>
                    <TableCell align="right">{formatCurrency(invoiceData.total)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvoice} color="primary">Đóng</Button>
          <Button onClick={exportPDF} color="primary" variant="contained">Xuất PDF</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InvoiceDetails;