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
router.get('/count', employeeController.getEmployeesByPosition);

module.exports = router;
