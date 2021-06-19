const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    type: String,
    status: String,
    date: String,
    studentNumber: Number,
    section: String,
    grade: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('Attendence', schema)
