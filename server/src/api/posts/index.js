const express = require('express')

const posts = express.Router()
const postsCtrl = require('./posts.controller')
const likesCtrl = require('./likes.controller')

posts.post('/', postsCtrl.write)
posts.get('/', postsCtrl.list)
posts.post('/:postId/likes', likesCtrl.like)
posts.delete('/:postId/likes', likesCtrl.dislike)

module.exports = posts