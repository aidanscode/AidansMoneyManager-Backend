const dbUrl = `${process.env['COUCHDB_URL']}`
const nano = require('nano')(dbUrl)
const Database = require('../../data/db')

module.exports = async () => {
  console.log(`Destroying DB ${Database.getDatabaseName('users')}...`)
  tryDestroy(Database.getDatabaseName('users'))

  console.log('Migration complete!')
}

const tryDestroy = async db => {
  try {
    await nano.db.destroy(db)
  } catch (error) {}
}
