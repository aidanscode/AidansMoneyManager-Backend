const dbUrl = `${process.env['COUCHDB_URL']}`
const nano = require('nano')(dbUrl)
const Database = require('../data/db')

module.exports = async () => {
  const usersDatabase = Database.getDatabaseName('users')
  console.log(`Creating DB ${usersDatabase}...`)
  await nano.db.create(usersDatabase)

  console.log('Creating users-by-email view')
  const usersByEmailMap = doc => {
    if (doc.type == 'user') emit(doc.email, doc._id)
  }
  await nano.use(usersDatabase).insert({
    _id: '_design/users',
    views: {
      'users-by-email': {
        map: usersByEmailMap.toString()
      }
    }
  })

  console.log('Migration complete!')
}
