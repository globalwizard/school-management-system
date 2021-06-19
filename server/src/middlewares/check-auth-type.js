const tokenizer = require('../utils/tokeniser')
const ApiError = require('../utils/api-error')
const paseCookies = require('../utils/parse-cookies')

function checkAuthType(whitelistRolesArray) {
  return (req, _res, next) => {
    try {
      const cookies = paseCookies(req)
      if (!cookies.session_id) {
        throw new ApiError(`Token is not Provided!`, 400)
      }

      // const encoded = cookies.session_id.replace('s%3A', '').split('.')
      // const decoded = encoded
      //   .filter((_item, index) => {
      //     return encoded.length - 1 > index
      //   })
      //   .join('.')

      const payload = tokenizer.decode(cookies.session_id)

      if (!payload || !whitelistRolesArray.includes(payload.user.role)) {
        throw new ApiError(
          `Only following user(s) allowed: "${whitelistRolesArray.join(', ')}"`,
          400,
        )
      }

      req.user = payload.user

      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = checkAuthType
