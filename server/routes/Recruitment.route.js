const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitmentController');

// Import middleware để xử lý upload file nếu có
const upload = require('../middlewares/upload'); // Giả sử bạn đã định nghĩa middleware này

// Định nghĩa các routes
router.get('/', recruitmentController.getAllJobs);
router.get('/:id', recruitmentController.getJobById);
router.post('/', upload.single('image'), recruitmentController.createJob);
router.put('/:id', upload.single('image'), recruitmentController.updateJob);
router.delete('/:id', recruitmentController.deleteJob);

module.exports = router;
