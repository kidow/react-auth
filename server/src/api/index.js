const express = require('express')
const api = express.Router()

const authRouter = require('./auth')
const postsRouter = require('./posts')
const usersRouter = require('./users')

api.use('/auth', authRouter)
api.use('/posts', postsRouter)
api.use('/users', usersRouter)

module.exports = api