const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return res.status(401).json({ message: 'Không có token, không được phép truy cập' });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Token không hợp lệ' });
//   }
// };

// module.exports = authenticateToken;


// const { errorHandler } = require('../utils/error')
// module.exports = verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return next(errorHandler(401, 'Unauthorized'));
//   }
//   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//     if (err) {
//       return next(errorHandler(401, 'Unauthorized'));
//     }
//     req.user = user;
//     next();
//   });
// };