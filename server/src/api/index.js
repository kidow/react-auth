const express = require('express')

const api = express.Router()
const booksRouter = require('./books')

api.use('/books', booksRouter)

module.exports = api