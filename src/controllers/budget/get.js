const BudgetDao = require('../../data/dao/budget')

module.exports = async (req, res) => {
  const userBudgets = await BudgetDao.getByUser(req.auth.id)
  return res.json({ budgets: userBudgets })
}
