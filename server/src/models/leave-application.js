const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    studentNumber: Number,
    section: String,
    grade: String,
    status: String,
    startDate: String,
    endDate: String,
    type: String,
    details: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('LeaveApplication', schema)
