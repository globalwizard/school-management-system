const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const { getAttendence, createAttendence } = require('../controllers/attendence')

router.get('/attendence', checkAuthType(['student', 'admin']), getAttendence)
router.post('/attendence', checkAuthType(['admin']), createAttendence)

module.exports = router
