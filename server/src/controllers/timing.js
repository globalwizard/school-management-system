const $timing = require('../models/timing')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { timingValidator } = require('../validators/timing')

module.exports.getTiming = async (_req, res, next) => {
  try {
    const timing = await $timing.find({})

    res.json(format({ timing }))
  } catch (err) {
    next(err)
  }
}

module.exports.createTiming = async (req, res, next) => {
  try {
    const { error } = timingValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const timing = await $timing.create(req.body)

    res.status(201).json(format({ timing }))
  } catch (err) {
    next(err)
  }
}
