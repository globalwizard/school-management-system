const joi = require('joi')

module.exports.attendenceValidator = obj => {
  const schema = joi.object({
    studentNumber: joi.number().required(),
    section: joi.string().min(1).max(30).required(),
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
    type: joi.string().required().min(4).max(30),
    date: joi.string().required().min(4).max(30),
  })

  return schema.validate(obj)
}
