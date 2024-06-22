import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Paper, Box, Select, MenuItem, InputLabel, FormControl, Button, Modal, Checkbox, ListItemSecondaryAction, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in Error Boundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const UpdateInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [updatedInvoice, setUpdatedInvoice] = useState({ selectedItems: [] });
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchMenu, setSearchMenu] = useState('');

  useEffect(() => {
    fetchInvoices();
    fetchMenuItems();
  }, []);

  useEffect(() => {
    if (selectedInvoiceId) {
      const invoice = invoices.find(inv => inv._id === selectedInvoiceId);
      setSelectedInvoice(invoice);
      setUpdatedInvoice(invoice || { selectedItems: [] });
    }
  }, [selectedInvoiceId, invoices]);

  useEffect(() => {
    fetchFilteredInvoices();
  }, [selectedDate, selectedArea]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
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

  const fetchFilteredInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/invoices', {
        params: {
          date: selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : '',
          area: selectedArea,
        },
      });
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching filtered invoices:', error);
    }
  };

  const handleInvoiceChange = (e) => {
    setSelectedInvoiceId(e.target.value);
  };

  const calculateTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const vat = subtotal * 0.1;
    return subtotal + vat;
  };

  const handleItemChange = (itemId, quantity) => {
    const updatedItems = updatedInvoice.selectedItems.map(item =>
      item._id === itemId ? { ...item, quantity: quantity || 1 } : item
    );
    const newTotal = calculateTotal(updatedItems);
    setUpdatedInvoice(prevState => ({
      ...prevState,
      selectedItems: updatedItems,
      total: newTotal,
    }));
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = updatedInvoice.selectedItems.filter(item => item._id !== itemId);
    const newTotal = calculateTotal(updatedItems);
    setUpdatedInvoice(prevState => ({
      ...prevState,
      selectedItems: updatedItems,
      total: newTotal,
    }));
  };

  const handleAddItem = (itemToAdd) => {
    const existingItem = updatedInvoice.selectedItems.find(item => item._id === itemToAdd._id);
    let updatedItems;
    if (existingItem) {
      updatedItems = updatedInvoice.selectedItems.map(item =>
        item._id === itemToAdd._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...updatedInvoice.selectedItems, { ...itemToAdd, quantity: 1 }];
    }
    const newTotal = calculateTotal(updatedItems);
    setUpdatedInvoice(prevState => ({
      ...prevState,
      selectedItems: updatedItems,
      total: newTotal,
    }));
  };

  const handleUpdateInvoice = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/invoices/${selectedInvoiceId}`, updatedInvoice);
      alert('Hóa đơn đã được cập nhật');
      fetchInvoices();
    } catch (error) {
      console.error('Error updating invoice:', error);
      alert('Cập nhật hóa đơn thất bại');
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    (!selectedDate || format(new Date(invoice.date), 'yyyy-MM-dd') === format(new Date(selectedDate), 'yyyy-MM-dd')) &&
    (!selectedArea || invoice.area === selectedArea) &&
    invoice.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMenuItems = menuItems.filter(item =>
    item.itemName.toLowerCase().includes(searchMenu.toLowerCase())
  );

  return (
    <ErrorBoundary>
      <Container>
        <Typography variant="h4" gutterBottom className="text-center title-1 title-font">Cập nhật hóa đơn</Typography>
        
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>Lọc hóa đơn theo ngày và khu vực</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <TextField
              label="Chọn ngày"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Khu vực</InputLabel>
              <Select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>Tìm hóa đơn</Typography>
          <TextField
            label="Tìm theo tên khách hàng"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Khu</TableCell>
                <TableCell>Bàn</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Tổng tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInvoices.map(invoice => (
                <TableRow key={invoice._id} onClick={() => setSelectedInvoiceId(invoice._id)}>
                  <TableCell>{invoice.area}</TableCell>
                  <TableCell>{invoice.tableNumber}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{format(new Date(invoice.date), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{invoice.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedInvoice && (
          <Paper sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>Chi tiết hóa đơn</Typography>
            <Box>
              <TextField
                label="Tên khách hàng"
                value={updatedInvoice.customerName}
                onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, customerName: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <List>
                {updatedInvoice.selectedItems.map(item => (
                  <ListItem key={item._id}>
                    <ListItemText primary={`${item.itemName} - Giá: ${item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`} />
                    <TextField
                      type="number"
                      label="Số lượng"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item._id, parseInt(e.target.value))}
                      inputProps={{ min: 0 }}
                      sx={{ width: '100px', marginLeft: '20px' }}
                    />
                    <IconButton onClick={() => handleDeleteItem(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" gutterBottom>Thêm món ăn</Typography>
              <Button variant="contained" onClick={() => setIsModalOpen(true)}>Thêm món ăn</Button>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Tổng tiền: {updatedInvoice.total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={handleUpdateInvoice} sx={{ marginTop: 2 }}>
                Lưu thay đổi
              </Button>
            </Box>
          </Paper>
        )}

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box sx={{ width: 400, bgcolor: 'background.paper', padding: 4, margin: 'auto', marginTop: 4 }}>
            <Typography variant="h6" gutterBottom>Thêm món ăn</Typography>
            <TextField
              label="Tìm kiếm món ăn"
              value={searchMenu}
              onChange={(e) => setSearchMenu(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              <List>
                {filteredMenuItems.map(item => (
                  <ListItem key={item._id} button onClick={() => handleAddItem(item)}>
                    <img src={`http://localhost:3000/${item.image}`} alt={item.itemName} style={{ width: '50px', height: '50px', marginRight: '20px' }} />
                    <ListItemText primary={item.itemName} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        checked={updatedInvoice.selectedItems.some(i => i._id === item._id)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Button variant="contained" onClick={() => setIsModalOpen(false)} sx={{ marginTop: 2 }}>Đóng</Button>
          </Box>
        </Modal>
      </Container>
    </ErrorBoundary>
  );
};

export default UpdateInvoice;
