/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const $course = require('../models/courses')
const $event = require('../models/events')
const $result = require('../models/results')
const $attendence = require('../models/attendence')
const format = require('../utils/format-response')

module.exports.getStudentDashboardData = async (req, res, next) => {
  try {
    const courses = await $course.countDocuments({
      section: req.user.section,
      grade: req.user.grade,
    })

    const events = await $event.countDocuments({
      section: req.user.section,
      grade: req.user.grade,
    })

    const resultsData = await $result.findOne({
      section: req.user.section,
      grade: req.user.grade,
      studentNumber: req.user.studentNumber,
    })

    const attendenceData = await $attendence.find({
      section: req.user.section,
      grade: req.user.grade,
      studentNumber: req.user.studentNumber,
    })

    const resultValues =
      resultsData && resultsData.thirdTerm
        ? resultsData.thirdTerm.subjectWise.map(x =>
            Math.round((x.obtained * 100) / x.total),
          )
        : resultsData && resultsData.secondTerm
        ? resultsData.secondTerm.subjectWise.map(x =>
            Math.round((x.obtained * 100) / x.total),
          )
        : resultsData && resultsData.firstTerm
        ? resultsData.firstTerm.subjectWise.map(x =>
            Math.round((x.obtained * 100) / x.total),
          )
        : [0, 0, 0]

    const resultLabels =
      resultsData && resultsData.thirdTerm
        ? resultsData && resultsData.thirdTerm.subjectWise.map(x => x.subject)
        : resultsData && resultsData.secondTerm
        ? resultsData.secondTerm.subjectWise.map(x => x.subject)
        : resultsData && resultsData.firstTerm
        ? resultsData.firstTerm.subjectWise.map(x => x.subject)
        : ['English', 'Urdu', 'Math']

    const attendencePresents =
      attendenceData && attendenceData.filter(x => x.status === 'present')
    const attendenceAbsents =
      attendenceData && attendenceData.filter(x => x.status === 'absent')

    const attendenceValues =
      attendenceData && attendenceData.length
        ? [
            Math.round((attendencePresents.length * 100) / attendenceData.length),
            Math.round((attendenceAbsents.length * 100) / attendenceData.length),
          ]
        : [100, 0]

    res.json(
      format({
        courses,
        results: 3,
        events,
        resultValues,
        resultLabels,
        attendenceValues,
      }),
    )
  } catch (err) {
    next(err)
  }
}
