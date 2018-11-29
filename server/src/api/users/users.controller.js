const Account = require('../../models/account')

exports.getProfile = async (req, res) => {
  const { username } = req.params

  let account
  try {
    account = await Account.findByUsername(username)
  } catch (e) {
    console.log(e)
    res.status(500)
  }

  if (!account) {
    res.status(404)
    return
  }

  const { profile, throughCount } = account

  res.json({profile, throughCount})
}

exports.getThumbnail = async (req, res) => {
  const { username } = req.params

  let account
  try {
    account = await Account.findByUsername(username)
  } catch (e) {
    console.log(e)
    res.status(500)
  }

  if (!account) {
    res.status(404)
    return
  }

  res.redirect(account.profile.thumbnail)
}