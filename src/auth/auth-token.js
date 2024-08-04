const jwt = require('jsonwebtoken')

module.exports = {
  cookieName: 'amm_auth_token',
  cookieOptions: { httpOnly: true, sameSite: true },
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
  },
  getExpiry: accessToken => {
    const split = accessToken.split('.')
    const payload = JSON.parse(atob(split[1]))
    return payload.exp
  }
}
