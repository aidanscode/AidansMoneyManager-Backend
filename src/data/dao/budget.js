const Database = require('../db')
const budgetsDatabaseName = Database.getDatabaseName('budgets')

const BudgetDao = {
  getByTimeframe: async (year, month, userId) => {
    const budgets = new Database(budgetsDatabaseName)
    const response = await budgets.getFromView(
      'budgets',
      'by-timeframe',
      `${year}-${month}-${userId}`,
      true
    )
    return response.rows.length ? response.rows[0].doc : null
  }
  //   getByEmail: async email => {
  //     const users = new Database(userDatabaseName)
  //     const response = await users.getFromView('users', 'by-email', email, true)
  //     return response.rows.length ? response.rows[0].doc : null
  //   }
}

module.exports = BudgetDao
