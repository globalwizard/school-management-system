const joi = require('joi')

module.exports.dateSheetValidator = obj => {
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
    date: joi.string().required().min(4).max(30),
    time: joi.string().required().min(4).max(100),
    subject: joi.string().required().min(4).max(100),
  })

  return schema.validate(obj)
}
