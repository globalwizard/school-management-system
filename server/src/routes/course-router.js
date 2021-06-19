const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const { getCourses, createCourses } = require('../controllers/courses')

router.get('/course', checkAuthType(['student', 'admin']), getCourses)
router.post('/course', checkAuthType(['admin']), createCourses)

module.exports = router
