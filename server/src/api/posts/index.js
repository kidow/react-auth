const express = require('express')

const posts = express.Router()
const postsCtrl = require('./posts.controller')

posts.post('/', postsCtrl.write)
posts.get('/', postsCtrl.list)

module.exports = posts