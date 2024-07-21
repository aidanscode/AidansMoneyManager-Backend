require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

app.use(routes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
    console.log(process.env['COUCHDB_URL'])
})