const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const {
  getLeaveApplications,
  createLeaveApplication,
} = require('../controllers/leave-application')

router.get(
  '/leave-application',
  checkAuthType(['student', 'admin']),
  getLeaveApplications,
)
router.post('/leave-application', createLeaveApplication)

module.exports = router
