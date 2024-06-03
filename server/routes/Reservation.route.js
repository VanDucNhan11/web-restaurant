const express = require('express');
const { createReservation, getReservations, getReservationById, updateReservation, deleteReservation, getReservationsByUserId, approveReservation } = require('../controllers/reservationController');

const router = express.Router();

router.post('/', createReservation);
router.get('/', getReservations);
router.get('/:id', getReservationById);
router.get('/user/:userId', getReservationsByUserId);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);
router.post('/:id/approve', approveReservation);

module.exports = router;
