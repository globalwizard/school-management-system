const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    grade: String,
    section: String,
    name: String,
    color: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('Course', schema)
