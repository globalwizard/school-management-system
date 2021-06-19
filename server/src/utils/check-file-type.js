const path = require('path')

function checkFileType(file) {
  const filetypes = /jpeg|jpg|png|gif/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

  const mimetype = filetypes.test(file.mimetype)

  if (!mimetype || !extname) {
    throw new Error('Only Images are Allowed!')
  }

  return true
}

module.exports = checkFileType
