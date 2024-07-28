const BudgetDao = require('../../data/dao/budget')
const { getTimeframe } = require('../../util/req')

module.exports = async (req, res) => {
  const { year, month } = getTimeframe(req)
  if (!year || !month) {
    return res
      .status(400)
      .json({ errors: ['Invalid or missing year/month given'] })
  }

  const newBudgetData = req.body.budget
  if (!newBudgetData) {
    return res.status(400).json({ errors: ['Missing updated budget data'] })
  }

  const originalBudget = await BudgetDao.getByTimeframe(
    year,
    month,
    req.auth.id
  )
  if (!originalBudget) {
    return res
      .status(404)
      .json({ errors: ['No budget found for given time period'] })
  }

  await BudgetDao.update({ ...originalBudget, budget: newBudgetData })

  return res.json({ success: true })
}
