const BudgetDao = require('../../data/dao/budget')

module.exports = async (req, res) => {
  const userBudgets = await BudgetDao.getByUser(req.auth.id)

  return res.json({ budgets: formatBudgets(userBudgets) })
}

const formatBudgets = budgets => {
  const result = {}

  const budgetsByYear = groupByPeriod(budgets, 'year', b => b)
  Object.entries(budgetsByYear).forEach(([year, budgetsInYear]) => {
    result[year] = groupByPeriod(budgetsInYear, 'month', b => b._id)
  })

  return result
}

const groupByPeriod = (budgets, periodType, mapBudget) => {
  const grouping = {}
  budgets.forEach(budget => {
    grouping[budget.period[periodType]] =
      grouping[budget.period[periodType]] ?? []

    grouping[budget.period[periodType]].push(mapBudget(budget))
  })

  return grouping
}
