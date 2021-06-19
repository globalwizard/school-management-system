const router = require('express').Router()
const { createResults, getResults } = require('../controllers/results')
const checkAuthType = require('../middlewares/check-auth-type')

router.get('/results', checkAuthType(['admin', 'student']), getResults)
router.post('/results', checkAuthType(['admin']), createResults)

module.exports = router
