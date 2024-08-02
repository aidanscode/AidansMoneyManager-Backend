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
    return res.status(400).json({ errors: ['Missing budget data'] })
  }

  await BudgetDao.create(newBudgetData, year, month, req.auth.user.id)
  return res.json({ success: true })
}
