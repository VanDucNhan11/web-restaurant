const Table = require('../models/Table.model');

// Get all tables
exports.getAllTables = async (req, res) => {
    try {
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new table
exports.createTable = async (req, res) => {
    const table = new Table({
        quantity: req.body.quantity,
        type: req.body.type,
        area: req.body.area,
        tableNumber: req.body.tableNumber
    });

    try {
        const newTable = await table.save();
        res.status(201).json(newTable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a table
exports.updateTable = async (req, res) => {
    const { id } = req.params;
    const { quantity, type, area, tableNumber } = req.body;

    try {
        const updatedTable = await Table.findByIdAndUpdate(id, {
            quantity,
            type,
            area,
            tableNumber
        }, { new: true });

        res.json(updatedTable);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a table
exports.deleteTable = async (req, res) => {
    try {
        await Table.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Table deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
