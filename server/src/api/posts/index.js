const express = require('express')

const posts = express.Router()
const postsCtrl = require('./posts.controller')
const likesCtrl = require('./likes.controller')
const commentCtrl = require('./comments.controller')

posts.post('/', postsCtrl.write)
posts.get('/', postsCtrl.list)
posts.post('/:postId/likes', likesCtrl.like)
posts.delete('/:postId/likes', likesCtrl.dislike)
posts.post('/:postId/comments', commentCtrl.comment)

module.exports = posts