class ApiError extends Error {
  constructor(message, statusCode = 400, type = 'operational') {
    super(message)
    this.statusCode = statusCode
    this.type = type
  }
}

module.exports = ApiError
