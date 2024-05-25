const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
    default: '',
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'https://i0.wp.com/www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg?fit=415%2C415&ssl=1',
  },
  role: {
    type: String,
    enum: ['Customer', 'Employee', 'Admin'], // Các vai trò có thể có
    default: 'Customer', // Mặc định là Customer
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
