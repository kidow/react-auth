const Joi = require('joi')
const Post = require('../../models/post')
const { Types: { ObjectId } } = require('mongoose')

exports.comment = async (req, res) => {
  const { user } = req.user
  console.log(user)
  if (!user) {
    res.status(403)
    return
  }

  const schema = Joi.object().keys({
    text: Joi.string().min(1).max(100).required()
  })

  const result = Joi.validate(req.body, schema)
  if (result.error) {
    res.status(400)
    return
  }

  const { username } = user.profile
  const { text } = req.body
  const { postId } = req.params

  if (!ObjectId.isValid(postId)) {
    res.status(400)
    return
  }

  let post = null
  try {
    post = await Post.findById(postId)
  } catch (e) {
    console.log(e)
    res.status(500)
  }

  if (!post) {
    res.status(404)
    return
  }

  try {
    await post.writeComment({username, text})
  } catch (e) {
    console.log(e)
    res.status(500)
  }

  res.json(post.comments)
}