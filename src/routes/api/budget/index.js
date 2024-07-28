const express = require('express')
const router = express.Router()
const authTokenMiddleware = require('../../../middleware/auth-token')

router.use(authTokenMiddleware)

router.get('/', require('../../../controllers/budget/get'))
router.get(
  '/:year/:month',
  require('../../../controllers/budget/get-by-timeframe')
)
router.post('/:year/:month', require('../../../controllers/budget/create'))
router.put('/:year/:month', require('../../../controllers/budget/edit'))
router.delete('/:year/:month', require('../../../controllers/budget/delete'))

module.exports = router
