const $timeTable = require('../models/time-table')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { timeTableValidator } = require('../validators/time-table')

module.exports.getTimeTable = async (req, res, next) => {
  try {
    const timeTableData = await $timeTable.find({
      section: req.user.section,
      grade: req.user.grade,
    })

    res.json(format({ timeTable: timeTableData }))
  } catch (err) {
    next(err)
  }
}

module.exports.createTimeTable = async (req, res, next) => {
  try {
    const { error } = timeTableValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const timeTableData = await $timeTable.create(req.body)

    res.status(201).json(format({ timeTableData }))
  } catch (err) {
    next(err)
  }
}
