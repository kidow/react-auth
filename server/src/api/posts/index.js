const express = require('express')

const posts = express.Router()
const postsCtrl = require('./posts.controller')

posts.get('/', postsCtrl.write),
posts.post('/', postsCtrl.list)

module.exports = posts