const dbUrl = `${process.env['COUCHDB_URL']}`
const nano = require('nano')(dbUrl)
const Database = require('../../data/db')

module.exports = async () => {
  await setupUsers()
  await setupBudgets()
  console.log('Migration complete!')
}

const setupUsers = async () => {
  const usersDatabase = Database.getDatabaseName('users')
  console.log(`Creating DB ${usersDatabase}...`)
  await nano.db.create(usersDatabase)

  console.log('Creating by-email view')
  const usersByEmailMap = doc => {
    if (doc.type == 'user') emit(doc.email, doc._id)
  }
  await nano.use(usersDatabase).insert({
    _id: '_design/users',
    views: {
      'by-email': {
        map: usersByEmailMap.toString()
      }
    }
  })
}

const setupBudgets = async () => {
  const budgetsDatabase = Database.getDatabaseName('budgets')
  console.log(`Creating DB ${budgetsDatabase}...`)
  await nano.db.create(budgetsDatabase)

  console.log('Creating by-user and by-timeframe view')
  const budgetsByUserMap = doc => {
    if (doc.type == 'budget') emit(doc.user_id, doc._id)
  }
  const budgetsByTimeframeMap = doc => {
    if (doc.type == 'budget')
      emit(`${doc.period.year}-${doc.period.month}-${doc.user_id}`, doc._id)
  }
  await nano.use(budgetsDatabase).insert({
    _id: '_design/budgets',
    views: {
      'by-user': {
        map: budgetsByUserMap.toString()
      },
      'by-timeframe': {
        map: budgetsByTimeframeMap.toString()
      }
    }
  })
}
