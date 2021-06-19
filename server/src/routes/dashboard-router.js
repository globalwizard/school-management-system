const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const { getStudentDashboardData } = require('../controllers/dashboard')

router.get('/dashboard/student', checkAuthType(['student']), getStudentDashboardData)

module.exports = router
