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
  },
  getByUser: async userId => {
    const budgets = new Database(budgetsDatabaseName)
    const response = await budgets.getFromView(
      'budgets',
      'by-user',
      userId,
      true
    )
    return response.rows.map(row => row.doc)
  },
  update: async document => {
    const budgets = new Database(budgetsDatabaseName)
    await budgets.insert(document)
  }
}

module.exports = BudgetDao
