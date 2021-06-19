const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    grade: String,
    section: String,
    day: String,
    periods: [String],
  },
  { timestamps: true },
)

module.exports = mongoose.model('TimeTable', schema)
