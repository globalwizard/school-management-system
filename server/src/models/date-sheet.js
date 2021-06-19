const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    grade: String,
    section: String,
    date: String,
    time: String,
    subject: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('DateSheet', schema)
