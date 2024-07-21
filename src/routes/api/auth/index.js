const express = require('express')
const router = express.Router()
const UserDao = require('../../../data/dao/user')

router.get('/test', async (_, res) => {
    res.send(`Welcome to /auth/test, <strong>TEST USER</strong>!`)
})

router.get('/login', async (_, res) => {
    const user = await UserDao.getById('baffec23ea25d7cd0040a61cc200a637')
    res.send(`Welcome to /auth/login, <strong>${user?.email}</strong>!`)
})

module.exports = router
