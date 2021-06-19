const joi = require('joi')

module.exports.resultsValidator = obj => {
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
    firstTerm: joi.object().required(),
    secondTerm: joi.object().required(),
    thirdTerm: joi.object().required(),
  })

  return schema.validate(obj)
}
