const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: 'Bạn chưa đăng nhập' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token không hợp lệ' });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
