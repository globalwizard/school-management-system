const $dateSheet = require('../models/date-sheet')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { dateSheetValidator } = require('../validators/date-sheet')

module.exports.getDateSheet = async (req, res, next) => {
  try {
    const dateSheet = await $dateSheet.find({
      section: req.user.section,
      grade: req.user.grade,
    })

    res.json(format({ dateSheet }))
  } catch (err) {
    next(err)
  }
}

module.exports.createDateSheet = async (req, res, next) => {
  try {
    const { error } = dateSheetValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const dateSheetData = await $dateSheet.create(req.body)

    res.status(201).json(format({ dateSheetData }))
  } catch (err) {
    next(err)
  }
}
