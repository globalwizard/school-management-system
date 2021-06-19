const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const { createEvent, getEvents } = require('../controllers/events')

router.get('/events', checkAuthType(['student', 'admin']), getEvents)
router.post('/events', checkAuthType(['admin']), createEvent)

module.exports = router
