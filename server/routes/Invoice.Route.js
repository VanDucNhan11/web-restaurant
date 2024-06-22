const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/', invoiceController.createInvoice);
router.get('/revenue', invoiceController.getRevenue);
router.put('/:id', invoiceController.updateInvoice);
router.get('/', invoiceController.getInvoices);

module.exports = router;
