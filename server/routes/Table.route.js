const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

// Get all tables
router.get('/', tableController.getAllTables);

// Create a new table
router.post('/', tableController.createTable);

// Update a table
router.patch('/:id', tableController.updateTable);


// Delete a table
router.delete('/:id', tableController.deleteTable);

module.exports = router;
