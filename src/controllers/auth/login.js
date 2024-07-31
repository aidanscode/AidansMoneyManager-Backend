const UserDao = require('../../data/dao/user')
const passwordUtils = require('../../auth/password')
const authToken = require('../../auth/auth-token')
const { cookieName } = require('../../auth/auth-token')

const signupController = async (req, res) => {
  const validationErrors = getInputValidationErrors(req)
  if (validationErrors.length) {
    return res.status(400).json({ errors: validationErrors })
  }

  const { email, password } = req.body
  const user = await getUserWithCredentials(email, password)
  if (!user) {
    return res
      .status(400)
      .json({ errors: ['Invalid login credentials supplied'] })
  }

  const token = authToken.generate({ id: user._id, email: user.email })

  res.cookie(cookieName, token, { httpOnly: true, sameSite: true })
  res.json({ success: true, authToken: token })
}

const getInputValidationErrors = req => {
  const errors = []
  if (!req?.body?.email) {
    errors.push('Email is missing from body')
  }
  if (!req?.body?.password) {
    errors.push('Password is missing from body')
  }
  return errors
}

const getUserWithCredentials = async (email, password) => {
  const user = await UserDao.getByEmail(email)
  return user && (await isCorrectPassword(password, user)) ? user : null
}

const isCorrectPassword = async (password, user) => {
  return await passwordUtils.compare(password, user.password)
}

module.exports = signupController
