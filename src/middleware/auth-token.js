const authTokenUtils = require('../auth/auth-token')
const { cookieName } = require('../auth/auth-token')

module.exports = (req, res, next) => {
  const authToken = getAuthToken(req)
  if (authToken && (decoded = authTokenUtils.verify(authToken))) {
    req.auth = {
      token: authToken,
      user: {
        id: decoded.id,
        email: decoded.email
      }
    }
    next()
  } else {
    return res
      .status(401)
      .json({ errors: ['Missing or invalid auth token provided'] })
  }
}

const getAuthToken = req => {
  let token = getAuthTokenFromCookie(req)
  if (!token) token = getAuthTokenFromAuthorizationHeader(req)
  if (!token) token = getAuthTokenFromBody(req)

  return token ? token : null
}

const getAuthTokenFromCookie = req => {
  const authToken = req.cookies ? req.cookies[cookieName] : undefined
  return authToken && authToken.length ? authToken : null
}

const getAuthTokenFromAuthorizationHeader = req => {
  const authHeader = req.headers['authorization']
  const bearerPrefix = 'bearer '

  return authHeader &&
    authHeader.toLowerCase().startsWith(bearerPrefix) &&
    authHeader.length > bearerPrefix.length
    ? authHeader.substring(bearerPrefix.length)
    : null
}

const getAuthTokenFromBody = req => {
  const authToken = req.body._authToken
  return authToken && authToken.length ? authToken : null
}
