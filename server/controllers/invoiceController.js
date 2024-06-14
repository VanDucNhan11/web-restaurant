const Invoice = require('../models/Invoice.model.js');

exports.createInvoice = async (req, res) => {
    try {
        const { area, tableNumber, date, total, username, customerName } = req.body; 
        const newInvoice = new Invoice({ area, tableNumber, date, total, username, customerName }); 
        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        console.error('Error saving invoice:', error);
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
  
  