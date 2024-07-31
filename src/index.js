require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000
const routes = require('./routes')

app.use(express.json())
app.use(cookieParser())
app.use(routes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
