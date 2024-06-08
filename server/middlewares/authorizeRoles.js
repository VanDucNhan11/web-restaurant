const router = require('express').Router();
const userControllers = require('../controllers/User.controller');

const { authenticateToken } = require('../middlewares/auth');

router.post('/signup', userControllers.signUp);
router.post('/signin', userControllers.signIn);
router.post('/google', userControllers.google_signIn);

// Route chỉ dành cho Admin
router.get('/admin-route', authenticateToken, userControllers.authorizeRoles('Quản trị viên'), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin' });
});

module.exports = router;
