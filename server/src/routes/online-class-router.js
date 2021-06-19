const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const { getOnlineClasses, createOnlineClasses } = require('../controllers/online-classes')

router.get('/online-classes', checkAuthType(['student', 'admin']), getOnlineClasses)
router.post('/online-classes', checkAuthType(['admin']), createOnlineClasses)

module.exports = router
