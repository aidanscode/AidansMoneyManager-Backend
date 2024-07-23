const express = require('express')
const router = express.Router()
const homeRouter = require('./home')
const authRouter = require('./auth')
const budgetRouter = require('./budget')

router.use('/', homeRouter)
router.use('/auth', authRouter)
router.use('/budget', budgetRouter)

module.exports = router
