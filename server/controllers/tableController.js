const Table = require('../models/Table.model'); // Thay đổi đường dẫn nếu cần thiết

// Lấy tất cả bàn
exports.getAllTables = async (req, res) => {
    try {
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tạo bàn mới
exports.createTable = async (req, res) => {
    const { quantity, type, area, tableNumber } = req.body;
    const table = new Table({
        quantity,
        type,
        area,
        tableNumber,
        status: 'Còn Trống' // Mặc định khi tạo mới là Trống
    });

    try {
        const newTable = await table.save();
        res.status(201).json(newTable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Cập nhật thông tin bàn
exports.updateTable = async (req, res) => {
    const { id } = req.params;
    const { quantity, type, area, tableNumber, status } = req.body;

    try {
        const updatedTable = await Table.findByIdAndUpdate(id, {
            quantity,
            type,
            area,
            tableNumber,
            status
        }, { new: true });

        res.json(updatedTable);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Xóa bàn
exports.deleteTable = async (req, res) => {
    try {
        await Table.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Table deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
