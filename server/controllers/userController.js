const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const userControllers = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find(); // Lấy tất cả người dùng từ cơ sở dữ liệu
      res.status(200).json(users); // Trả về danh sách người dùng
    } catch (error) {
      next(error);
    }
  },
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

  updateRole: async (req, res, next) => {
    const { userId } = req.params;
    const { role } = req.body;

    try {
      // Kiểm tra xem vai trò được cập nhật có hợp lệ không
      if (!['Customer', 'Employee', 'Admin'].includes(role)) {
        return res.status(400).json({ message: 'Vai trò không hợp lệ' });
      }

      // Cập nhật vai trò của người dùng
      const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });

      // Kiểm tra xem người dùng có tồn tại hay không
      if (!updatedUser) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }

      // Trả về thông tin người dùng sau khi cập nhật
      res.status(200).json({ message: 'Cập nhật vai trò thành công', user: updatedUser });
    } catch (error) {
      next(error);
    }
  },

  // Xoá tài khoản người dùng
  deleteUser: async (req, res, next) => {
    const { userId } = req.params;

    try {
      // Xoá tài khoản của người dùng
      const deletedUser = await User.findByIdAndDelete(userId);

      // Kiểm tra xem người dùng có tồn tại hay không
      if (!deletedUser) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }

      // Trả về thông báo thành công
      res.status(200).json({ message: 'Xoá tài khoản thành công' });
    } catch (error) {
      next(error);
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  // Cập nhật thông tin profile của người dùng
  updateProfile: async (req, res) => {
    const { name, email, phone, } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          username: name,
          email: email,
          phone: phone
        },
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },


  // Đổi mật khẩu của người dùng
  changePassword: async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      await user.save();

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

};

module.exports = userControllers;