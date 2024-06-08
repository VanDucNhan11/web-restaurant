const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', employeeController.getAllEmployees);
router.post('/', upload.single('photo'), employeeController.createEmployee);
router.get('/:id', employeeController.getEmployee);
router.put('/:id', upload.single('photo'), employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
// Lấy tổng số nhân viên
router.get('/count', employeeController.getTotalEmployees);

// Lấy nhân viên theo vị trí
router.get('/by-position', employeeController.getEmployeesByPosition);

module.exports = router;
