const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const { getFee, createFee } = require('../controllers/fee')

router.get('/fee', checkAuthType(['student', 'admin']), getFee)
router.post('/fee', checkAuthType(['admin']), createFee)

module.exports = router
