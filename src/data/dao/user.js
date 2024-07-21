const Database = require('../db')
const userDatabaseName = Database.getDatabaseName('users')

const UserDao = {
  create: async (email, hashedPassword) => {
    const users = new Database(userDatabaseName)
    const { id } = await users.insert({
      email: email,
      password: hashedPassword
    })
    return id
  },
  getById: async id => {
    const users = new Database(userDatabaseName)
    const user = await users.get(id)
    return user
  },
  getByEmail: async email => {
    return null
  }
}

module.exports = UserDao
