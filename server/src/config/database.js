/* eslint-disable no-console */
const mongoose = require('mongoose')
const { DATABASE_URL } = require('./env')

class Database {
  constructor(connectionString) {
    this.connectionString = connectionString
  }

  init() {
    mongoose
      .connect(this.connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log(`[ OK ] connected to Database!`))
      .catch(error => {
        console.log(`[ ERROT ] connection to Database Failed!`, '\n', error)
      })
  }
}

module.exports = new Database(DATABASE_URL)
