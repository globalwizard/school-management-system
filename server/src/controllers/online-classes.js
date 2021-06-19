const $onlineClass = require('../models/online-classes')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { onlineClassValidator } = require('../validators/online-classes')

module.exports.getOnlineClasses = async (req, res, next) => {
  try {
    const classData = await $onlineClass.find({
      section: req.user.section,
      grade: req.user.grade,
    })

    res.json(format({ classes: classData }))
  } catch (err) {
    next(err)
  }
}

module.exports.createOnlineClasses = async (req, res, next) => {
  try {
    const { error } = onlineClassValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const classData = await $onlineClass.create(req.body)

    res.status(201).json(format({ classData }))
  } catch (err) {
    next(err)
  }
}
