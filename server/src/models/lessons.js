const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    grade: String,
    section: String,
    subject: String,
    title: String,
    notes: String,
    video: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('Lesson', schema)
