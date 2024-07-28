module.exports = {
  getTimeframe: req => {
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
}
