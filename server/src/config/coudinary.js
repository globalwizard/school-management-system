const client = require('cloudinary').v2
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } = require('./env')

class Cloudinary {
  constructor(cloudName, apiKey, apiSecret) {
    this.name = cloudName
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  init() {
    client.config({
      cloud_name: this.name,
      api_key: this.apiKey,
      api_secret: this.apiSecret,
    })
  }

  upload(filePath, options = {}) {
    this.filePath = filePath

    return new Promise((resolve, reject) => {
      client.uploader.upload(this.filePath, options, (err, result) => {
        if (err) reject(err)

        resolve(result)
      })
    })
  }

  delete(url, options = {}) {
    this.url = url

    return new Promise((resolve, reject) => {
      client.uploader.destroy(url, options, (err, result) => {
        if (err) reject(err)

        resolve(result)
      })
    })
  }
}

module.exports = new Cloudinary(
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
)
