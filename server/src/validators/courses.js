const joi = require('joi')

module.exports.courseValidator = obj => {
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
    name: joi.string().required().min(4).max(30),
    color: joi.string().required().min(1).max(100),
  })

  return schema.validate(obj)
}
