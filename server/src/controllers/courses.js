const $course = require('../models/courses')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { courseValidator } = require('../validators/courses')

module.exports.getCourses = async (req, res, next) => {
  try {
    const courseData = await $course.find({
      section: req.user.section,
      grade: req.user.grade,
    })

    res.json(format({ courses: courseData }))
  } catch (err) {
    next(err)
  }
}

module.exports.createCourses = async (req, res, next) => {
  try {
    const { error } = courseValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const courseData = await $course.create(req.body)

    res.status(201).json(format({ classData: courseData }))
  } catch (err) {
    next(err)
  }
}
