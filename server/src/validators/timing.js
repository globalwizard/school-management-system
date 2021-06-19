const joi = require('joi')

module.exports.timingValidator = obj => {
  const schema = joi.object({
    startAt: joi.string().required().min(6).max(30),
    endAt: joi.string().required().min(6).max(30),
  })

  return schema.validate(obj)
}
