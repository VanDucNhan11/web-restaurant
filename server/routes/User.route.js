const { authenticateToken } = require('../middlewares/auth');
const router = require('express').Router();
const userControllers = require('../controllers/userController');



router.get('/', userControllers.getAllUsers);
router.post('/signup', userControllers.signUp);
router.post('/signin', userControllers.signIn);
router.post('/google', userControllers.google_signIn);
// Endpoint để cập nhật vai trò của người dùng
router.put('/:userId/role', userControllers.updateRole);
// Endpoint để xoá tài khoản của người dùng
router.delete('/:userId', userControllers.deleteUser);

router.get('/:userId/profile',  userControllers.getUserProfile);
router.put('/:userId/profile',  userControllers.updateProfile);
router.put('/:userId/change-password',  userControllers.changePassword);


module.exports = router;
