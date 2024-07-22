const UserDao = require('../../data/dao/user')
const passwordUtils = require('../../auth/password')

const signupController = async (req, res) => {
  const validationErrors = getInputValidationErrors(req)
  if (validationErrors.length) {
    return res.status(400).json({ errors: validationErrors })
  }

  const { email, password } = req.body
  if (await isExistingUser(email)) {
    return res.status(400).json({
      errors: ['There already exists a user with the specified email.']
    })
  }

  const userId = await createUser(email, password)
  res.json({ success: true, userId: userId })
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

const isExistingUser = async email => {
  return (await UserDao.getByEmail(email)) !== null
}

const createUser = async (email, password) => {
  const hashedPassword = await passwordUtils.hash(password)
  const userId = await UserDao.create(email, hashedPassword)
  return userId
}

module.exports = signupController
