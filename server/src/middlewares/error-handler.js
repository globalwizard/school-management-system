/* eslint-disable no-unused-vars */
module.exports = () => {
  return (error, _req, res, _next) => {
    const statusCode = error.statusCode || 400
    res.status(statusCode).json({
      error: true,
      statusCode,
      type: error.type || 'Bad Request!',
      message: error.message || 'Something went Wrong!',
    })
  }
}
