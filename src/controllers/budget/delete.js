const BudgetDao = require('../../data/dao/budget')
const { getTimeframe } = require('../../util/req')

module.exports = async (req, res) => {
  const { year, month } = getTimeframe(req)
  if (!year || !month) {
    return res
      .status(400)
      .json({ errors: ['Invalid or missing year/month given'] })
  }

  const budget = await BudgetDao.getByTimeframe(year, month, req.auth.user.id)
  if (!budget) {
    return res
      .status(404)
      .json({ errors: ['No budget found for given time period'] })
  }

  await BudgetDao.delete(budget._id, budget._rev)
  return res.json({ success: true })
}
