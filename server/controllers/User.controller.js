const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const userControllers = {
  authorizeRoles: (requiredRole) => {
    return (req, res, next) => {
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Bạn không có quyền truy cập tài nguyên này' });
      }
      next();
    };
  },
  signUp: async (req, res, next) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email || email === '' || username === '' || password === '') {
      return next(errorHandler(400, 'Tất cả các trường là bắt buộc'));
    }

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          message: 'Email đã tồn tại'
        });
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({
        email,
        username,
        password: hashPassword,
        role: 'Customer', 
      });
      await newUser.save();
      res.status(200).json({
        message: 'Đăng ký thành công'
      });
    } catch (e) {
      next(e);
    }
  },

  signIn: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
      return res.status(400).json({ message: 'Tất cả các trường là bắt buộc' });
    }
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return res.status(400).json({
          message: 'Không tìm thấy người dùng.'
        });
      }
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Mật khẩu không hợp lệ.' });
      }
      const token = jwt.sign(
        { userId: validUser._id, isAdmin: validUser.isAdmin, role: validUser.role },
        process.env.SECRET_KEY
      );
      const { password: pass, ...rest } = validUser._doc;
      return res.status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        })
        .json({ ...rest, role: validUser.role }); // Trả về role
    } catch (error) {
      return res.status(500).json({ message: 'Có lỗi xảy ra khi đăng nhập' });
    }
  },
  google_signIn: async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin, role: user.role },
          process.env.SECRET_KEY
        );
        const { password, ...rest } = user._doc;
        return res.status(200).cookie('access_token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        }).json({ ...rest, role: user.role }); // Trả về role
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
        const newUser = new User({
          username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
          role: 'Customer'  // Đặt mặc định vai trò là 'Customer'
        });
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id, isAdmin: newUser.isAdmin, role: newUser.role },
          process.env.SECRET_KEY
        );
        const { password, ...rest } = newUser._doc;
        return res.status(200).cookie('access_token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        }).json({ ...rest, role: newUser.role }); // Trả về role
      }
    } catch (error) {
      next(error);
    }
  },

  getUserProfile: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  updateUserProfile: async (req, res, next) => {
    try {
      const updates = req.body;
      const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true }).select('-password');
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId);
      const { currentPassword, newPassword } = req.body;
      const validPassword = bcrypt.compareSync(currentPassword, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' });
      }
      user.password = bcrypt.hashSync(newPassword, 10);
      await user.save();
      res.status(200).json({ message: 'Đổi mật khẩu thành công' });
    } catch (error) {
      next(error);
    }
  },

  logout: (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Đăng xuất thành công' });
  }
};

module.exports = userControllers;
