const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

// Lấy tất cả bàn
router.get('/', tableController.getAllTables);

// Tạo bàn mới
router.post('/', tableController.createTable);

// Cập nhật thông tin bàn
router.patch('/:id', tableController.updateTable);

// Xóa bàn
router.delete('/:id', tableController.deleteTable);

module.exports = router;
