const crypto = require('crypto')

class Hasher {
  constructor() {
    this.salt = crypto.randomBytes(16).toString('hex')
  }

  async hash(str) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(str, this.salt, 1000, 64, 'sha512', (error, x) => {
        if (error) reject(error)

        resolve({ hash: x.toString('hex'), salt: this.salt })
      })
    })
  }

  async verifyHash(str, passwordSalt, hash) {
    this.salt = passwordSalt

    const reHash = await new Promise((resolve, reject) => {
      crypto.pbkdf2(str, this.salt, 1000, 64, 'sha512', (error, x) => {
        if (error) reject(error)

        resolve(x.toString('hex'))
      })
    })

    return reHash === hash
  }
}

module.exports = new Hasher()
