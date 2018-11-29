const Account = require('../../models/account')
const Post = require('../../models/post')
const Joi = require('joi')
const { Types: { ObjectId } } = require('mongoose')

const redis = require('redis')
const publisher = redis.createClient()

exports.write = async (req, res) => {
  const { user } = req
  
  if (!user) {
    res.status(403)
    res.json({ message: 'not logged in' })
    return
  }

  let account
  try {
    account = await Account.findById(user._id).exec()
  } catch (e) {
    res.status(500)
    console.error(e)
  }

  if (!account) {
    res.sendStatus(403)
    return
  }

  const count = account.thoughtCount + 1

  const schema = Joi.object().keys({
    content: Joi.string().min(5).max(1000).required()
  })

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.sendStatus(400)
    return
  }

  const { content } = req.body

  let post
  try {
    post = await Post.write({
      count,
      username: user.profile.username,
      content
    })
    await account.increaseThoughtCount()
  } catch (e) {
    res.status(500)
    console.error(e)
  }

  post = post.toJSON()
  delete post.likes
  post.liked = false

  res.json(post)

  publisher.publish('posts', JSON.stringify({
    type: 'posts/RECEIVE_NEW_POST',
    payload: post
  }))
}

exports.list = async (req, res) => {
  const { cursor, username } = req.query

  if (cursor && !ObjectId.isValid(cursor)) {
    res.sendStatus(400)
    return
  }

  const { user } = req
  const self = user ? user.username : null

  let posts = null
  try {
    posts = await Post.list({cursor, username, self})
  } catch (e) {
    console.error(e)
    res.status(500)
  }

  const next = posts.length === 20 ? `/api/posts/?${username ? `username=${username}&` : ''}cursor=${posts[19]._id}` : null

  function checkLiked(post) {
    post = post.toObject()

    const checked = Object.assign(post, { liked: user !== null && post.likes.length > 0})
    delete checked.likes
    return checked
  }

  posts = posts.map(checkLiked)

  res.json({ 
    next, 
    data: posts
  })
}