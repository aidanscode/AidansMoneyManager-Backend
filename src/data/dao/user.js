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
    const users = new Database(userDatabaseName)
    const response = await users.getFromView(
      'users',
      'users-by-email',
      email,
      true
    )
    return response.rows.length ? response.rows[0].doc : null
  }
}

module.exports = UserDao
