const express = require('express')

const api = express.Router()

const booksRouter = require('./books')
const authRouter = require('./auth')
const postsRouter = require('./posts')

api.use('/books', booksRouter)
api.use('/auth', authRouter)
api.use('/posts', postsRouter)

module.exports = api