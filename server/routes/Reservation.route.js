const express = require('express');
const { createReservation, 
    getReservations, 
    getReservationById, 
    updateReservation, 
    deleteReservation, 
    getReservationsByUserId, 
    approveReservation, 
    cancelReservation, 
    createmomo,
    createPaymentZaloPay,
} = require('../controllers/reservationController');

const router = express.Router();

router.post('/', createReservation);
router.get('/', getReservations);   
router.get('/:id', getReservationById);
router.get('/user/:userId', getReservationsByUserId);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);
router.post('/:id/approve', approveReservation);
router.post('/:id/cancel', cancelReservation);


router.post('/momo', createmomo);

router.post('/zalopay', createPaymentZaloPay);


module.exports = router;
