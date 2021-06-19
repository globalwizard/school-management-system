const $lessons = require('../models/lessons')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { lessonValidator } = require('../validators/lessons')

module.exports.getLessons = async (req, res, next) => {
  try {
    const lessonData = await $lessons.find({
      section: req.user.section,
      grade: req.user.grade,
      subject: req.params.subject,
    })

    res.json(format({ lessons: lessonData }))
  } catch (err) {
    next(err)
  }
}

module.exports.createLesson = async (req, res, next) => {
  try {
    const { error } = lessonValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const lessonData = await $lessons.create(req.body)

    res.status(201).json(format({ lessonData }))
  } catch (err) {
    next(err)
  }
}
