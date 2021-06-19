const joi = require('joi')

module.exports.userSignupValidator = user => {
  const schema = joi.object({
    firstName: joi.string().label('First Name').min(3).max(30),
    lastName: joi.string().label('Last Name').min(3).max(30),
    fatherName: joi.string().label('Father Name').min(3).max(30),
    cnicNumber: joi.string().label('CNIC Number').min(8).max(30),
    dob: joi.string().label('Date of Birth').min(3).max(30),
    gender: joi.string().valid('male', 'female', 'other'),
    bloodGroup: joi.string().min(1).max(10),
    displayName: joi.string().label('Display Name').min(3).max(30),
    role: joi.string().valid('student', 'admin').required(),
    studentNumber: joi.number().label('Student Number'),
    email: joi.string().email(),
    password: joi.string().required().min(6),
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
  })

  return schema.validate(user)
}

module.exports.userUpdateValidator = user => {
  const schema = joi.object({
    firstName: joi.string().label('First Name').min(3).max(30),
    lastName: joi.string().label('Last Name').min(3).max(30),
    fatherName: joi.string().label('Father Name').min(3).max(30),
    cnicNumber: joi.string().label('CNIC Number').min(8).max(30),
    dob: joi.string().label('Date of Birth').min(3).max(30),
    gender: joi.string().valid('male', 'female', 'other'),
    bloodGroup: joi.string().min(1).max(10),
    email: joi.string().email(),
  })

  return schema.validate(user)
}

module.exports.userLoginValidator = user => {
  const schema = joi.object({
    id: joi.alternatives(joi.string().email(), joi.number()).required(),
    password: joi.string().required().min(6).alphanum(),
  })

  return schema.validate(user)
}
