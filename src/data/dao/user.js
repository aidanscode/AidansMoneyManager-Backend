const Database = require('../db')
const userDatabaseName = Database.getDatabaseName('users')

const UserDao = {
    create: async (email, hashedPassword) => {
        return null
    },
    getById: async (id) => {
        const users = new Database(userDatabaseName)
        const user = await users.get(id)
        return user
    },
    getByEmail: async (email) => {
        //use a view
        return null
    },
}

module.exports = UserDao