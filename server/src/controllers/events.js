const $events = require('../models/events')
const format = require('../utils/format-response')
const ApiError = require('../utils/api-error')
const { eventsValidator } = require('../validators/events')

module.exports.getEvents = async (req, res, next) => {
  try {
    const eventsData = await $events.find({
      section: req.user.section,
      grade: req.user.grade,
    })

    res.json(format({ events: eventsData }))
  } catch (err) {
    next(err)
  }
}

module.exports.createEvent = async (req, res, next) => {
  try {
    const { error } = eventsValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const eventsData = await $events.create(req.body)

    res.status(201).json(format({ eventsData }))
  } catch (err) {
    next(err)
  }
}
