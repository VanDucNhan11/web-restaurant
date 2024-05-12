// code  vaoo day
const User = require('../models/User.model')
const bcrypt = require('bcrypt');
const { errorHandler } = require('../utils/error');

const userControllers = {
  signUp: async (req, res, next) => {

    const { username, password, email } = req.body;
    if (!username || !password || !email ||
      email === '' || username === '' || password === '') {
      next(errorHandler(400, 'Tất cả các trường là bắt buộc'));
    }

    try {
      // kiểm tra email đã tồn tại hay chua
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: 'Email đã tồn tại'
        })
      }
      // nếu chưa tồn tại thì tạo mới
      const newUser = new User({
        username,
        email,
        password
      })
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      res.status(201).json({
        message: 'Đăng ký thành công'
      })
    } catch (e) {
      next(e);
    }
  }
}

module.exports = userControllers;