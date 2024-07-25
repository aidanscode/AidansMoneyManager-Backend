const BudgetDao = require('../../data/dao/budget')

module.exports = async (req, res) => {
  const { year, month } = normalizeTimeframe(req)
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
  res.json({ budget: budget })
}

const normalizeTimeframe = req => {
  const { year, month } = req.params
  if (!year || !month) {
    return {}
  }

  if (isNaN(year) || isNaN(month)) {
    return {}
  }

  return {
    year: Math.floor(Number(year)),
    month: Math.floor(Number(month))
  }
}
