const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    studentNumber: Number,
    section: String,
    grade: String,
    month: String,
    year: String,
    total: String,
    status: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('Fee', schema)
