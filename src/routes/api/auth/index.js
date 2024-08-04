const express = require('express')
const router = express.Router()
const registerController = require('../../../controllers/auth/register')
const loginController = require('../../../controllers/auth/login')
const logoutController = require('../../../controllers/auth/logout')
const whoamiController = require('../../../controllers/auth/whoami')
const authTokenMiddleware = require('../../../middleware/auth-token')

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/logout', authTokenMiddleware, logoutController)
router.post('/whoami', authTokenMiddleware, whoamiController)

module.exports = router
