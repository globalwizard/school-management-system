const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    section: String,
    grade: String,
    classType: String,
    date: String,
    starTime: String,
    duration: String,
    subject: String,
    details: String,
    link: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('OnlineClass', schema)
