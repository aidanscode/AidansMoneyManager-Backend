const express = require('express')
const router = express.Router()

router.get('/', (_, res) => {
    res.send('<h1>Hello, world</h1>')
})

module.exports = router