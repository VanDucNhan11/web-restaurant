const Reservation = require('../models/Reservation.model');
const nodemailer = require('nodemailer');
const qrcode = require('qrcode');
const querystring = require('querystring');
const crypto = require('crypto');




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


const createVnpayHash = (req, res, next) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);
  var config = require('config');
  var secretKey = config.get('vnp_HashSecret');
  var querystring = require('qs');
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");     
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
   

  if(secureHash === signed){
      var orderId = vnp_Params['vnp_TxnRef'];
      var rspCode = vnp_Params['vnp_ResponseCode'];
      //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      res.status(200).json({RspCode: '00', Message: 'success'})
  }
  else {
      res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
  }
};

const createPaymentUrl = async (req, res, next) => {
    try {
      const ipAddr = req.headers['x-forwarded-for'] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
      
      const config = require('config');
      const dateFormat = require('dateformat');
      
      const tmnCode = config.get('GRVLYHCV');
      const secretKey = config.get('YAQ8ESNI1GPY1KDJ8QT26FS7Z08IA4EL');
      const vnpUrl = config.get('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
      const returnUrl = config.get('http://localhost:5173/success');
      
      const date = new Date();
      const createDate = dateFormat(date, 'yyyymmddHHmmss');
      const orderId = dateFormat(date, 'HHmmss');
      const { amount, bankCode, orderDescription, orderType, language } = req.body;

      if(locale === null || locale === ''){
            locale = 'vn';
        }
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        res.redirect(vnpUrl)

  } catch (error) {
      next(error);
  }
};

const vnpayReturn = (req, res, next) => {
    var vnp_Params = req.query;
      
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var config = require('config');
    var tmnCode = config.get('vnp_TmnCode');
    var secretKey = config.get('vnp_HashSecret');

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('success', {code: vnp_Params['vnp_ResponseCode']})
    } else{
        res.render('success', {code: '97'})
    }
};
const createmomo = async (req, Rres) => {
  const partnerCode = "MOMO";
  const accessKey = "F8BBA842ECF85";
  const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const requestId = partnerCode + new Date().getTime();
  const orderId = requestId;
  const orderInfo = "Thanh Toán đặt cọc bàn";
  const redirectUrl = "http://localhost:5173/success";
  const ipnUrl = "http://localhost:5173//success";

  const amount = req.body.amount;
  const requestType = "captureWallet"
  const extraData = ""; //pass empty value if your merchant does not have stores

  // Create raw signature
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  // Generate HMAC SHA256 signature
  const crypto = require('crypto');
  const signature = crypto.createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');

  // JSON object to send to MoMo endpoint
  const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: 'en'
  });

  // Create the HTTPS request
  const https = require('https');
  const options = {
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/v2/gateway/api/create',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody)
      }
  };

  // Send the request and get the response
  const hm = https.request(options, res => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', chunk => {
          body += chunk;
      });
      res.on('end', () => {
          try {
              const responseBody = JSON.parse(body);
              const payUrl = responseBody.payUrl;
              Rres.json(payUrl); // Return payUrl to the client
          } catch (error) {
              console.error('Error parsing MoMo response:', error);
              Rres.status(500).json({ error: 'Error processing MoMo response' });
          }
      });
  });

  // Handle HTTPS request errors
  hm.on('error', e => {
      console.error(`Problem with MoMo request: ${e.message}`);
      Rres.status(500).json({ error: e.message });
  });

  // Write data to request body and end request
  hm.write(requestBody);
  hm.end();
};

  

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByUserId,
  approveReservation,
  cancelReservation,
  createPaymentUrl,
  vnpayReturn,
  createmomo,
  createVnpayHash
};
