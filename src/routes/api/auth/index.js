const express = require('express')
const router = express.Router()
const signupController = require('../../../controllers/auth/signup')
const loginController = require('../../../controllers/auth/login')

router.post('/signup', signupController)
router.post('/login', loginController)

module.exports = router
