const joi = require('joi')

module.exports.feeValidator = obj => {
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
    month: joi.string().max(30).min(2).required(),
    year: joi.string().max(30).min(2).required(),
    total: joi.number().required(),
    status: joi.string().max(30).min(2).required(),
  })

  return schema.validate(obj)
}
