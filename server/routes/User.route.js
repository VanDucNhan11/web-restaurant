
// code  vaoo day

const router = require('express').Router()
const userControllers = require('../controllers/User.controller')

router.post('/signup', userControllers.signUp)
router.post('/signin', userControllers.signIn)

module.exports = router