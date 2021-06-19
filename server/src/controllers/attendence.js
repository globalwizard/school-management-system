const $attendence = require('../models/attendence')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { attendenceValidator } = require('../validators/attendence')

module.exports.getAttendence = async (req, res, next) => {
  try {
    const attendence = await $attendence.find({
      studentNumber: req.user.studentNumber,
      section: req.user.section,
      grade: req.user.grade,
    })

    res.json(format({ attendence }))
  } catch (err) {
    next(err)
  }
}

module.exports.createAttendence = async (req, res, next) => {
  try {
    const { error } = attendenceValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const attendenceData = await $attendence.create(req.body)

    res.status(201).json(format({ attendenceData }))
  } catch (err) {
    next(err)
  }
}
