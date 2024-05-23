const router = require('express').Router();
const userControllers = require('../controllers/User.controller');

const { authenticateToken } = require('../middlewares/auth');

router.post('/signup', userControllers.signUp);
router.post('/signin', userControllers.signIn);
router.post('/google', userControllers.google_signIn);
router.get('/profile', authenticateToken, userControllers.getUserProfile);
router.put('/profile', authenticateToken, userControllers.updateUserProfile);
router.put('/change-password', authenticateToken, userControllers.changePassword); 
router.post('/logout', authenticateToken, userControllers.logout); 

// Route chỉ dành cho Admin
router.get('/admin-route', authenticateToken, userControllers.authorizeRoles('Admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin' });
});

module.exports = router;
