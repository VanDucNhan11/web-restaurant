const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    area: String,
    tableNumber: Number,
    date: Date,
    total: Number,
    username: String,
    customerName: String, 
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
