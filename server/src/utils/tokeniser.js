const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env')

class Tokenizer {
  constructor(key) {
    this.key = key
  }

  tokenize(payload) {
    return jwt.sign(payload, this.key)
  }

  decode(token) {
    return jwt.verify(token, this.key)
  }
}

module.exports = new Tokenizer(JWT_SECRET)
