const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const { getTimeTable, createTimeTable } = require('../controllers/time-table')

router.get('/time-table', checkAuthType(['student', 'admin']), getTimeTable)
router.post('/time-table', checkAuthType(['admin']), createTimeTable)

module.exports = router
