const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const registerRoutes = require('./routes')
const errorHandler = require('./middlewares/error-handler')
const ApiError = require('./utils/api-error')
const { JWT_SECRET, CROSS_ORIGIN_DOMAIN } = require('./config/env')

const app = express()

app.use(express.static(path.join(__dirname, './views')))
app.use(express.json())
app.use(cookieParser(JWT_SECRET))
app.use(
  cors({
    origin: CROSS_ORIGIN_DOMAIN,
  }),
)

registerRoutes(app)

app.get('/favicon.ico', (_req, res) => {
  res.sendFile(path.join(__dirname, './views/favicon.ico'))
})

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'))
})

process.on('uncaughtException', error => {
  throw new ApiError(error.message, 500, 'internal_server_error')
})

app.use(errorHandler())

module.exports = app
