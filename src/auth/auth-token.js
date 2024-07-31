const jwt = require('jsonwebtoken')

module.exports = {
  cookieName: 'amm_auth_token',
  generate: data => {
    return jwt.sign(data, process.env['JWT_SECRET'], {
      expiresIn: process.env['JWT_TTL']
    })
  },
  verify: accessToken => {
    try {
      return jwt.verify(accessToken, process.env['JWT_SECRET'])
    } catch (error) {
      return false
    }
  }
}
