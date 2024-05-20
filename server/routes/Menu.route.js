const express = require('express');
const multer = require('multer');
const { getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllMenuItems);
router.post('/', upload.single('image'), createMenuItem);
router.put('/:id', upload.single('image'), updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;
