const jwt = require('jsonwebtoken')

module.exports = {
  generate: data => {
    return jwt.sign(data, process.env['JWT_SECRET'], {
      expiresIn: process.env['JWT_TTL']
    })
  }
}
