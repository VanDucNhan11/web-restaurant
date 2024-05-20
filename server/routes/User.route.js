
// code  vaoo day

const router = require('express').Router()
const userControllers = require('../controllers/User.controller')

router.post('/signup', userControllers.signUp)
router.post('/signin', userControllers.signIn)
router.post('/google', userControllers.google_signIn)

module.exports = router