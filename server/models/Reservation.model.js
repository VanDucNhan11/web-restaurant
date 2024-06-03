// models/Reservation.model.js

const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  bookingTime: {
    type: String,
    required: true
  },
  numberOfGuests: {
    type: Number,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['chưa xác nhận', 'đã xác nhận'],
    default: 'chưa xác nhận'
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
