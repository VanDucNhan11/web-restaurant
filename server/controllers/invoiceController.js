const Invoice = require('../models/Invoice.model.js');

exports.createInvoice = async (req, res) => {
    try {
        const { area, tableNumber, date, total, username } = req.body;
        const newInvoice = new Invoice({ area, tableNumber, date, total, username });
        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        console.error('Error saving invoice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const startOfDay = (date) => {
    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0); // Đặt giờ bắt đầu của ngày trong múi giờ UTC
    return start;
};

const endOfDay = (date) => {
    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999); // Đặt giờ kết thúc của ngày trong múi giờ UTC
    return end;
};

exports.getRevenue = async (req, res) => {
    try {
        const { timeFrame, date } = req.query;
        const currentDate = new Date(date);
        let start, end;

        switch (timeFrame) {
            case 'weekly':
                // Xử lý tuần
                break;
            case 'monthly':
                // Xử lý tháng
                break;
            case 'daily':
            default:
                // Xử lý ngày
                start = startOfDay(currentDate);
                end = endOfDay(currentDate);
                break;
        }

        const invoices = await Invoice.find({ date: { $gte: start, $lte: end } });
        const totalRevenue = invoices.reduce((total, invoice) => total + invoice.total, 0);

        res.status(200).json({ totalRevenue, invoices });
    } catch (error) {
        console.error('Error fetching revenue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
  
  