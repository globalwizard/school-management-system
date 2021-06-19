const $leaveApplication = require('../models/leave-application')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { leaveApplicationValidator } = require('../validators/leave-application')

module.exports.getLeaveApplications = async (req, res, next) => {
  try {
    const leaveApplications = await $leaveApplication.find({
      studentNumber: req.user.studentNumber,
      section: req.user.section,
      grade: req.user.grade,
    })

    res.json(format({ leaveApplications }))
  } catch (err) {
    next(err)
  }
}

module.exports.createLeaveApplication = async (req, res, next) => {
  try {
    const { error } = leaveApplicationValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const leaveApplication = await $leaveApplication.create(req.body)

    res.status(201).json(format({ leaveApplication }))
  } catch (err) {
    next(err)
  }
}
