const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    studentNumber: Number,
    grade: String,
    section: String,
    firstTerm: {
      type: {
        total: Number,
        obtained: Number,
        subjectWise: [{ subject: String, obtained: Number, total: Number }],
      },
      required: true,
      default: null,
    },
    secondTerm: {
      type: {
        total: Number,
        obtained: Number,
        subjectWise: [{ subject: String, obtained: Number, total: Number }],
      },
      required: true,
      default: null,
    },
    thirdTerm: {
      type: {
        total: Number,
        obtained: Number,
        subjectWise: [{ subject: String, obtained: Number, total: Number }],
      },
      required: true,
      default: null,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Result', schema)
