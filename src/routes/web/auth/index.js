const express = require('express')
const router = express.Router()

router.get('/login', async (_, res) => {
    const dbAddress = `${process.env['COUCHDB_URL']}`
    const nano = require('nano')(dbAddress)
    const testDb = nano.use('test')
    const doc = await testDb.get('baffec23ea25d7cd0040a61cc2003b77')
    console.log(doc)
    res.send(`Welcome to /login, ${doc.name}!`)
})

module.exports = router