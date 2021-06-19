const joi = require('joi')

module.exports.leaveApplicationValidator = obj => {
  const schema = joi.object({
    studentNumber: joi.number().required(),
    section: joi.string().min(1).max(30),
    grade: joi
      .string()
      .valid(
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th',
        '6th',
        '7th',
        '8th',
        '9th',
        '10th',
        '11th',
        '12th',
      ),
    status: joi.string().required().min(4).max(30),
    startDate: joi.string().required().min(4).max(100),
    endDate: joi.string().required().min(4).max(100),
    type: joi.string().required().min(4).max(100),
    details: joi.string().required().min(4).max(500),
  })

  return schema.validate(obj)
}
