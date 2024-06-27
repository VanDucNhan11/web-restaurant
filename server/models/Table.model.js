const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    area: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'VIP'],
        required: true
    },
    tableNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Còn Trống', 'Đang phục vụ'],
        default: 'Còn Trống' 
    }
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
