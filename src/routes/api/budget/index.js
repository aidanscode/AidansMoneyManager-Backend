const express = require('express')
const router = express.Router()
const authTokenMiddleware = require('../../../middleware/auth-token')

router.use(authTokenMiddleware)

router.get('/:year/:month', require('../../../controllers/budget/get'))

module.exports = router
