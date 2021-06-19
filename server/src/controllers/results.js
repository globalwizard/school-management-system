const $results = require('../models/results')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { resultsValidator } = require('../validators/results')

module.exports.getResults = async (req, res, next) => {
  try {
    const resultsData = await $results.findOne({
      studentNumber: req.user.studentNumber,
      section: req.user.section,
      grade: req.user.grade,
    })

    res.json(format({ result: resultsData }))
  } catch (err) {
    next(err)
  }
}

module.exports.createResults = async (req, res, next) => {
  try {
    const { error } = resultsValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const resultsData = await $results.create(req.body)

    res.status(201).json(format({ resultsData }))
  } catch (err) {
    next(err)
  }
}
