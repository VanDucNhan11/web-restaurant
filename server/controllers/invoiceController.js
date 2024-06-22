const Invoice = require('../models/Invoice.model.js');


exports.createInvoice = async (req, res) => {
  try {
    const { area, tableNumber, date, total, username, customerName, selectedItems } = req.body; // Thêm selectedItems

    // Tạo URL thanh toán (Ví dụ: http://localhost:3000/payment/ID_HOA_DON)
    const paymentUrl = `http://localhost:3000/payment/${req.body.id}`;

    const newInvoice = new Invoice({
      area,
      tableNumber,
      date,
      total,
      username,
      customerName,
      selectedItems, // Lưu danh sách món ăn
      paymentUrl
    });
    
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error('Error saving invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { area, tableNumber, date, total, username, customerName, selectedItems } = req.body;

    const newTotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { area, tableNumber, date, total: newTotal, username, customerName, selectedItems },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRevenue = async (req, res) => {
  const { filter, date } = req.query;
  let startDate;
  let endDate = new Date(); // endDate là hôm nay theo mặc định

  switch (filter) {
    case 'daily':
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'weekly':
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'monthly':
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'quarterly':
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 3);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'yearly':
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'specificDate':
      startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      break;
    default:
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
  }

  try {
    const invoices = await Invoice.find({ date: { $gte: startDate, $lte: endDate } });
    const totalRevenue = invoices.reduce((acc, invoice) => acc + invoice.total, 0);
    res.json({ totalRevenue, invoices });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching revenue', error });
  }
};
  
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};