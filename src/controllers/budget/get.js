const BudgetDao = require('../../data/dao/budget')

module.exports = async (req, res) => {
  const userBudgets = await BudgetDao.getByUser(req.auth.id)

  return res.json({ budgets: formatBudgets(userBudgets) })
}

const formatBudgets = budgets => {
  const budgetsByYear = groupByPeriod(budgets, 'year')

  const result = {}
  Object.entries(budgetsByYear).forEach(([year, budgetsInYear]) => {
    result[year] = budgetsInYear.map(budget => budget.period.month)
  })

  return result
}

const groupByPeriod = (budgets, periodType) => {
  const grouping = {}
  budgets.forEach(budget => {
    grouping[budget.period[periodType]] =
      grouping[budget.period[periodType]] ?? []

    grouping[budget.period[periodType]].push(budget)
  })

  return grouping
}
