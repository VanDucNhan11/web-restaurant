const Reservation = require('../models/Reservation.model');
const nodemailer = require('nodemailer');
const qrcode = require('qrcode');

// Create a new reservation
const createReservation = async (req, res) => {
  const { userID, fullName, email, phone, bookingDate, bookingTime, numberOfGuests, note, selectedItems } = req.body;

  try {
    const newReservation = new Reservation({
      userID,
      fullName,
      email,
      phone,
      bookingDate,
      bookingTime,
      numberOfGuests,
      note,
      selectedItems // Include selected items
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userID', 'username email');
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific reservation
const getReservationById = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id).populate('userID', 'username email');
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a reservation
const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, phone, bookingDate, bookingTime, numberOfGuests, note, status } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { fullName, email, phone, bookingDate, bookingTime, numberOfGuests, note, status },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getReservationsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const reservations = await Reservation.find({ userID: userId }).populate('userID', 'username email');
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve a reservation
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'madamelann@gmail.com',
    pass: 'k t x f p b z g e j b k y z b j' // Sử dụng mật khẩu ứng dụng ở đây
  }
});

// Approve a reservation
const approveReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const approvedReservation = await Reservation.findByIdAndUpdate(
      id,
      { status: 'đã xác nhận' },
      { new: true }
    );

    if (!approvedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    // Generate QR code
    let qrCodeData = `
      Người đặt: ${approvedReservation.fullName}
      Email: ${approvedReservation.email}
      Số điện thoại: ${approvedReservation.phone}
      Ngày đặt: ${new Date(approvedReservation.bookingDate).toLocaleDateString()}
      Thời gian đặt: ${approvedReservation.bookingTime}
      Số lượng khách: ${approvedReservation.numberOfGuests}
      Ghi chú: ${approvedReservation.note}
    `;

    qrCodeData += '\nMón ăn đã chọn:\n';
    approvedReservation.selectedItems.forEach(item => {
      qrCodeData += `${item.itemName} - ${item.quantity} x ${item.price.toLocaleString('vi-VN')} VNĐ\n`;
    });

    const qrCodeUrl = await qrcode.toDataURL(qrCodeData);

    // Send email notification with QR code
    const mailOptions = {
      from: 'madamelann@gmail.com',
      to: approvedReservation.email,
      subject: 'Đặt bàn thành công',
      text: `Xin chào ${approvedReservation.fullName},\n\nĐặt bàn của bạn vào ngày ${new Date(approvedReservation.bookingDate).toLocaleDateString()} lúc ${approvedReservation.bookingTime} đã được duyệt.\n\nCảm ơn bạn đã đặt bàn với chúng tôi!\n\nBest regards,\nYour Restaurant`,
      attachments: [{
        filename: 'qrcode.png',
        path: qrCodeUrl,
        cid: 'qrcode'
      }],
      html: `
        <p>Xin chào ${approvedReservation.fullName},</p>
        <p>Đặt bàn của bạn vào ngày ${new Date(approvedReservation.bookingDate).toLocaleDateString()} lúc ${approvedReservation.bookingTime} đã được duyệt.</p>
        <p>Cảm ơn bạn đã đặt bàn ở nhà hàng chúng tôi!</p>
        <p>Đây là mã QR Code đặt bàn của bạn</p>
        <p><img src="cid:qrcode" alt="QR code"></p>
        <p>Các món ăn đã đặt:</p>
        <ul>
          ${approvedReservation.selectedItems.map(item => `<li>${item.itemName} - ${item.quantity} x ${item.price.toLocaleString('vi-VN')} VNĐ</li>`).join('')}
        </ul>
        <p>Best regards,<br>Your Restaurant</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json(approvedReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelReservation = async (req, res) => {
  const { id } = req.params;
  const { cancelReason } = req.body; // Thêm trường cancelReason lấy từ request body

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    // Gửi email thông báo lý do huỷ đặt bàn cho khách hàng
    const mailOptions = {
      from: 'madamelann@gmail.com',
      to: deletedReservation.email,
      subject: 'Huỷ đặt bàn',
      text: `Xin chào ${deletedReservation.fullName},\n\nĐặt bàn của bạn vào ngày ${new Date(deletedReservation.bookingDate).toLocaleDateString()} lúc ${deletedReservation.bookingTime} đã được huỷ.\n\nLý do: ${cancelReason}\n\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!\n\nBest regards,\nYour Restaurant`,
      html: `
        <p>Xin chào ${deletedReservation.fullName},</p>
        <p>Đặt bàn của bạn vào ngày ${new Date(deletedReservation.bookingDate).toLocaleDateString()} lúc ${deletedReservation.bookingTime} đã được huỷ.</p>
        <p>Lý do: ${cancelReason}</p>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        <p>Best regards,<br>Your Restaurant</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByUserId,
  approveReservation,
  cancelReservation
};
