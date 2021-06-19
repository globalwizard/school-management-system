const joi = require('joi')

module.exports.timeTableValidator = obj => {
  const schema = joi.object({
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
    day: joi.string().required().min(4).max(30),
    periods: joi.array().required(),
  })

  return schema.validate(obj)
}
