const BudgetDao = require('../../data/dao/budget')
const { getTimeframe } = require('../../util/req')

module.exports = async (req, res) => {
  const { year, month } = getTimeframe(req)
  if (!year || !month) {
    return res
      .status(400)
      .json({ errors: ['Invalid or missing year/month given'] })
  }
  const budget = await BudgetDao.getByTimeframe(year, month, req.auth.id)
  if (!budget) {
    return res
      .status(404)
      .json({ errors: ['No budget found for given time period'] })
  }
  res.json({ budget: budget.budget })
}
