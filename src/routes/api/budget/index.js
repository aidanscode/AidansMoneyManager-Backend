const express = require('express')
const router = express.Router()
const authTokenMiddleware = require('../../../middleware/auth-token')

router.use(authTokenMiddleware)

router.get('/', require('../../../controllers/budget/get'))
router.get(
  '/:year/:month',
  require('../../../controllers/budget/get-by-timeframe')
)

module.exports = router
