const express = require('express')
const router = express.Router()
const webRouter = require('./web')
const apiRouter = require('./api')

router.use('/', webRouter)
router.use('/api', webRouter)

module.exports = router