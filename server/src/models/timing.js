const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    startAt: String,
    endAt: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('Timing', schema)
