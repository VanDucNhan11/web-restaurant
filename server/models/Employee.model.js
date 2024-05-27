const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['Đang làm việc', 'Tạm nghỉ', 'Nghỉ việc'], required: true },
  photo: { type: String, required: false } // Thêm trường ảnh
});

module.exports = mongoose.model('Employee', employeeSchema);
