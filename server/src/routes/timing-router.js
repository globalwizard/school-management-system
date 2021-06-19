const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const { getTiming, createTiming } = require('../controllers/timing')

router.get('/school-timing', checkAuthType(['student', 'admin']), getTiming)
router.post('/school-timing', checkAuthType(['admin']), createTiming)

module.exports = router
