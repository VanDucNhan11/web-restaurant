// User.route.js
const router = require('express').Router();
const userControllers = require('../controllers/User.controller');

router.post('/signup', userControllers.signUp);
router.post('/signin', userControllers.signIn);
router.post('/google', userControllers.google_signIn);
router.get('/profile', userControllers.getUserProfile);
router.put('/profile', userControllers.updateUserProfile);
router.put('/change-password', userControllers.changePassword); 
router.post('/logout', userControllers.logout); 

module.exports = router;
