const fs = require('fs')
const path = require('path')
const $user = require('../models/user')
const ApiError = require('../utils/api-error')
const format = require('../utils/format-response')
const cookieOptions = require('../utils/cookie-options')
const hasher = require('../utils/hasher')
const checkFileType = require('../utils/check-file-type')
const tokeniser = require('../utils/tokeniser')
const cloudinary = require('../config/coudinary')
const {
  userSignupValidator,
  userLoginValidator,
  userUpdateValidator,
} = require('../validators/user')

module.exports.handleCreateUser = async (req, res, next) => {
  try {
    const { error } = userSignupValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    if (req.file) {
      checkFileType(req.file)

      const filePath = path.join(__dirname, `../uploads/${req.file.filename}`)

      const isSuccessUpload = await cloudinary.upload(filePath, { folder: 'avatars' })
      if (!isSuccessUpload) throw new ApiError('Failed To Upload Image')

      fs.unlink(filePath, err => {
        if (err) throw new ApiError('Failed To Remove Image from disk')
      })

      req.body.avatarPublicId = isSuccessUpload.public_id
      req.body.avatar = isSuccessUpload.url
    }

    const password = await hasher.hash(req.body.password)
    const user = await $user.create({
      ...req.body,
      password: password.hash,
      salt: password.salt,
    })
    if (!user) throw new ApiError('Failed to create new user!')

    user.password = undefined
    user.salt = undefined

    const token = tokeniser.tokenize({ user })
    if (!token) throw new ApiError('Failed to create new jwt token!')

    res.cookie('session_id', token, cookieOptions).json(format())
  } catch (error) {
    next(error)
  }
}

module.exports.handleAuthorizeUser = async (req, res, next) => {
  try {
    const { error } = userLoginValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const user = await $user.findOne({
      $or: [{ email: req.body.id }, { studentNumber: req.body.id }],
    })
    if (!user) throw new ApiError('Invalid email Address or Student Number!')

    const password = await hasher.verifyHash(req.body.password, user.salt, user.password)
    if (!password) throw new ApiError('Invalid Password!')

    user.password = undefined
    user.salt = undefined

    const token = tokeniser.tokenize({ user })
    if (!token) throw new ApiError('Failed to create new jwt token!')

    res.cookie('session_id', token, cookieOptions).json(format())
  } catch (error) {
    next(error)
  }
}

module.exports.updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError('File not provided!')

    checkFileType(req.file)

    const filePath = path.join(__dirname, `../uploads/${req.file.filename}`)

    const isSuccessUpload = await cloudinary.upload(filePath, { folder: 'avatars' })
    if (!isSuccessUpload) throw new ApiError('Failed To Upload Image to cloudinary')

    if (req.user.avatarPublicId) {
      const isSuccessDelete = await cloudinary.delete(req.user.avatarPublicId)

      if (!isSuccessDelete) {
        throw new ApiError('Failed To Delete Old image from cloudinary')
      }
    }

    fs.unlink(filePath, err => {
      if (err) throw new ApiError('Failed To Remove Image from disk')
    })

    const user = await $user.findOneAndUpdate(
      {
        studentNumber: req.user.studentNumber,
        section: req.user.section,
        grade: req.user.grade,
      },
      {
        avatar: isSuccessUpload.url,
        avatarPublicId: isSuccessUpload.public_id,
      },
    )
    if (!user) throw new ApiError('Failed to Update User from database!')

    user.password = undefined
    user.salt = undefined

    const token = tokeniser.tokenize({ user })
    if (!token) throw new ApiError('Failed to create new jwt token!')

    res
      .cookie('session_id', token, cookieOptions)
      .json(format({ url: isSuccessUpload.url }))
  } catch (error) {
    next(error)
  }
}

module.exports.updateExistingUserData = async (req, res, next) => {
  try {
    const { error } = userUpdateValidator(req.body)
    if (error) throw new ApiError(error.details[0].message)

    const user = await $user.findOneAndUpdate(
      {
        studentNumber: req.user.studentNumber,
        section: req.user.section,
        grade: req.user.grade,
      },
      req.body,
    )
    if (!user) throw new ApiError('Failed To update user data!')

    user.password = undefined
    user.salt = undefined

    const token = tokeniser.tokenize({ user })
    if (!token) throw new ApiError('Failed to create new jwt token!')

    res.cookie('session_id', token, cookieOptions).json(format({ user }))
  } catch (error) {
    next(error)
  }
}

module.exports.updateUserPassword = async (req, res, next) => {
  try {
    if (
      !req.body.oldPassword ||
      req.body.oldPassword.length < 6 ||
      !req.body.newPassword ||
      req.body.newPassword.length < 6
    ) {
      throw new ApiError('Invalid input!')
    }

    const user = await $user.findOne({
      studentNumber: req.user.studentNumber,
      section: req.user.section,
      grade: req.user.grade,
    })
    if (!user) throw new ApiError('Failed To find user from database!')

    const password = await hasher.verifyHash(
      req.body.oldPassword,
      user.salt,
      user.password,
    )
    if (!password) throw new ApiError('Wrong old Password!')

    const { salt, hash } = await hasher.hash(req.body.newPassword)

    const success = await $user.updateOne(
      {
        studentNumber: req.user.studentNumber,
        section: req.user.section,
        grade: req.user.grade,
      },
      {
        password: hash,
        salt,
      },
    )
    if (!success) throw new ApiError('Failed to update Password!')

    res.json(format())
  } catch (err) {
    next(err)
  }
}
