const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const { getLessons, createLesson } = require('../controllers/lessons')

router.get('/lessons/:subject', checkAuthType(['student', 'admin']), getLessons)
router.post('/lessons', checkAuthType(['admin']), createLesson)

module.exports = router
