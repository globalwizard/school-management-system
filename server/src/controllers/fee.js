const $fee = require('../models/fee')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { feeValidator } = require('../validators/fee')

module.exports.getFee = async (req, res, next) => {
  try {
    const fees = await $fee.find({
      studentNumber: req.user.studentNumber,
      section: req.user.section,
      grade: req.user.grade,
    })

    res.json(format({ fees }))
  } catch (err) {
    next(err)
  }
}

module.exports.createFee = async (req, res, next) => {
  try {
    const { error } = feeValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const feeData = await $fee.create(req.body)

    res.status(201).json(format({ feeData }))
  } catch (err) {
    next(err)
  }
}
