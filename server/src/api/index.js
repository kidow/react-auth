const express = require('express')

const api = express.Router()
const booksRouter = require('./books')
const authRouter = require('./auth')

api.use('/books', booksRouter)
api.use('/auth', authRouter)

module.exports = api