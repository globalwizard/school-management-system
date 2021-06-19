const joi = require('joi')

module.exports.eventsValidator = obj => {
  const schema = joi.object({
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
    startDate: joi.string().max(30).min(4).required(),
    duration: joi.string().max(30).min(4).required(),
    timing: joi.string().max(30).min(4).required(),
    contribution: joi.string().max(30).min(2).required(),
    dressCode: joi.string().max(100).min(2).required(),
  })

  return schema.validate(obj)
}
