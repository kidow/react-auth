const Account = require('../../models/account')

exports.getProfile = async (req, res) => {
  const { username } = req.params

  let account
  try {
    account = await Account.findByUsername(username)
  } catch (e) {
    res.status(500)
    console.log(e)
  }

  if (!account) {
    res.status(404)
    return
  }

  res.json({
    profile: account.profile,
    throughCount: account.throughCount
  })
}

exports.getThumbnail = async (req, res) => {
  const { username } = req.params

  let account
  try {
    account = await Account.findByUsername(username)
  } catch (e) {
    res.status(500)
    console.log(e)
  }

  if (!account) {
    res.status(404)
    return
  }

  res.redirect(account.profile.thumbnail)
}