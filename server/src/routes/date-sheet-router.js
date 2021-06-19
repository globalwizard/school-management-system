const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const { getDateSheet, createDateSheet } = require('../controllers/date-sheet')

router.get('/date-sheet', checkAuthType(['student', 'admin']), getDateSheet)
router.post('/date-sheet', checkAuthType(['admin']), createDateSheet)

module.exports = router
