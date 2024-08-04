const { cookieName, cookieOptions } = require('../../auth/auth-token')

module.exports = (_, res) => {
  res.clearCookie(cookieName, cookieOptions)
  res.send()
}
