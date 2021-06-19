const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    displayName: String,
    fatherName: String,
    cnicNumber: String,
    dob: String,
    gender: String,
    bloodGroup: String,
    studentNumber: { type: Number, unique: true },
    email: { type: String, unique: true },
    role: { type: String, required: true, default: 'studient' },
    password: String,
    salt: String,
    grade: String,
    section: String,
    avatar: String,
    avatarPublicId: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', schema)
