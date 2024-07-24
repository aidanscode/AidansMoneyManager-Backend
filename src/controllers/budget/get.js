module.exports = (req, res) => {
  const { year, month } = normalizeTimeframe(req)
  if (!year || !month) {
    return res
      .status(400)
      .json({ errors: ['Invalid or missing year/month given'] })
  }
  res.send('Input validated!')
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
