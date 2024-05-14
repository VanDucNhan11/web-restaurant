// code  vaoo day
const User = require('../models/User.model')
const bcrypt = require('bcrypt');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();
const userControllers = {
  signUp: async (req, res, next) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email ||
      email === '' || username === '' || password === '') {
      next(errorHandler(400, 'Tất cả các trường là bắt buộc'));
    }

    // kiểm tra email đã tồn tại hay chua
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email đã tồn tại'
      })
    }
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({
      email: email,
      username: username,
      password: hashPassword,
    })
    try {
      await newUser.save();
      res.status(200).json({
        message: 'Đăng ký thành công'
      })
    } catch (e) {
      next(e);
    }
  },

  signIn: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password ||
      email === '' || password === '') {
      next(errorHandler(400, 'Tất cả các trường là bắt buộc'));
    }
    try {
      // kiểm tra email đã tồn tại hay chua
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return res.status(400).json({
          message: 'Không tìm thấy người dùng.'
        })
      }
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, 'Mật khẩu không hợp lệ.'));
      }
      const token = jwt.sign(
        { userId: validUser._id, isAdmin: validUser.isAdmin },
        process.env.SECRET_KEY
      )
      // không trả ra password
      const { password: pass, ...rest } = validUser._doc;
      return res.status(200)
        .cookie('access_token', token,
          {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
          })
        .json(rest);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userControllers;