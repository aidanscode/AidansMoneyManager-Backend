const Database = require('../db')
const budgetsDatabaseName = Database.getDatabaseName('budgets')

const BudgetDao = {
  create: async (budget, year, month, userId) => {
    const budgets = new Database(budgetsDatabaseName)
    await budgets.insert({
      period: {
        year,
        month
      },
      budget,
      user_id: userId,
      type: 'budget'
    })
  },
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
    await budgets.update(document)
  },
  delete: async (id, rev) => {
    const budgets = new Database(budgetsDatabaseName)
    await budgets.destroy(id, rev)
  }
}

module.exports = BudgetDao
