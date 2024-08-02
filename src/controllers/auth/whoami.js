const authTokenUtils = require('./../../auth/auth-token')

const whoamiController = async (req, res) => {
  res.json({
    user: req.auth.user,
    exp: authTokenUtils.getExpiry(req.auth.token)
  })
}

module.exports = whoamiController
