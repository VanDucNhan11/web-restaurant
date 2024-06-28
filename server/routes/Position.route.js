const express = require('express');
const { getAllPositions, createPosition } = require('../controllers/positionController');

const router = express.Router();

router.get('/', getAllPositions);
router.post('/', createPosition);

module.exports = router;
