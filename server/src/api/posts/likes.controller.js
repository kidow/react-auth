const Post = require('../../models/post')

exports.like = async (req, res) => {
  const { user } = req
  if (!user) {
    res.status(403)
    return
  }

  const { postId } = req.params
  const { username } = user.profile

  let post = null
  try {
    post = await Post.findById(postId, {
      likesCount: 1,
      likes: {
        '$elemMatch': { '$eq': username }
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500)
  }

  if (!post) {
    res.status(404)
    return
  }

  if (post.likes[0] === username) {
    res.json({
      liked: true,
      likesCount: post.likesCount
    })
    return
  }

  try {
    post = await Post.like({
      _id: postId,
      username
    })
  } catch (e) {
    console.log(e)
    res.status(500)
  }

  res.json({
    liked: true,
    likesCount: post.likesCount
  })
}

exports.unlike = async (req, res) => {
  const { user } = req
  if (!user) {
    res.status(403)
    return
  }

  const { postId } = req.params
  const { username } = user.profile

  let post = null
  try {
    post = await Post.findById(postId, {
      likesCount: 1,
      likes: {
        '$elemMatch': { '$eq': username }
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500)
  }

  if (!post) {
    res.status(404)
    return
  }

  if (post.likes.length === 0) {
    res.json({
      liked: false,
      likesCount: post.likesCount
    })
    return
  }

  try {
    post = await Post.unlike({
      _id: postId,
      username
    })
  } catch (e) {
    console.log(e)
    res.status(500)
  }

  res.json({
    liked: false,
    likesCount: post.likesCount
  })
}