const joi = require('joi')

module.exports.lessonValidator = obj => {
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
    subject: joi.string().max(30).min(5).required(),
    title: joi.string().max(30).min(5).required(),
    notes: joi.string().required(),
    video: joi.string().required(),
  })

  return schema.validate(obj)
}
