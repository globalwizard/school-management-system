const joi = require('joi')

module.exports.onlineClassValidator = obj => {
  const schema = joi.object({
    classType: joi.string().required().min(2).max(30),
    date: joi.string().required().min(6).max(30),
    startTime: joi.string().required().min(6).max(30),
    duration: joi.string().required().min(2).max(30),
    subject: joi.string().required().min(4).max(30),
    link: joi.string().uri(),
    details: joi.string(),
  })

  return schema.validate(obj)
}
