const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    section: String,
    grade: String,
    startDate: String,
    duration: String,
    timing: String,
    contribution: String,
    dressCode: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('Event', schema)
