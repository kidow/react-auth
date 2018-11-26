const Account = require('../../models/account')
const Post = require('../../models/post')
const Joi = require('joi')

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
    console.log(e)
  }

  if (!account) {
    res.status(403)
    return
  }

  const count = account.thoughtCount + 1

  const schema = Joi.object().keys({
    content: Joi.string().min(5).max(1000).required()
  })

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.status(403)
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
    console.log(e)
  }

  res.json(post)
}

exports.list = async (req, res) => {
  let posts = null
  try {
    posts = await Post.list({})
  } catch (e) {
    res.status(500)
    console.log(e)
  }

  const next = posts.length === 20 ? `/api/posts/?cursor=${posts[19]._id}` : null

  res.json({ next, data: posts })
}