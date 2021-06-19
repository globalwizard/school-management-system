const router = require('express').Router()
const checkAuthType = require('../middlewares/check-auth-type')
const uploader = require('../middlewares/file-uploader')
const {
  handleCreateUser,
  handleAuthorizeUser,
  updateUserAvatar,
  updateExistingUserData,
  updateUserPassword,
} = require('../controllers/user')

router.post('/user/authorize', handleAuthorizeUser)

router.post(
  '/user/create',
  checkAuthType(['admin']),
  uploader.single('avatar'),
  handleCreateUser,
)

router.post(
  '/user/update/avatar',
  checkAuthType(['student', 'admin', 'parent']),
  uploader.single('avatar'),
  updateUserAvatar,
)

router.post(
  '/user/update',
  checkAuthType(['student', 'admin', 'parent']),
  updateExistingUserData,
)

router.post(
  '/user/update/password',
  checkAuthType(['student', 'admin', 'parent']),
  updateUserPassword,
)

module.exports = router
