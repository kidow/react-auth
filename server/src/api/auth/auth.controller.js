const Joi = require('joi')
const Account = require('../../models/account')

exports.localRegister = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
  })

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.sendStatus(400)
    return
  }

  let existing = null
  try {
    existing = await Account.findByEmailOrUsername(req.body)
  } catch (e) {
    console.error(e)
    res.status(500)
  }

  if (existing) {
    res.status(409)
    res.json({ key: existing.email === req.body.email ? 'email' : 'username' })
    return
  }

  let account = null
  try {
    account = await Account.localRegister(req.body)
  } catch (e) {
    console.error(e)
    res.status(500)
  }

  let token = null
  try {
    token = await account.generateToken()
  } catch (e) {
    console.error(e)
    res.status(500)
  }

  res.cookie('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
  res.json(account.profile)
}

exports.localLogin = async (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.sendStatus(400)
    return
  }

  const { email, password } = req.body

  let account = null
  try {
    account = await Account.findByEmail(email)
  } catch (e) {
    console.error(e)
    res.status(500)
  }

  if (!account || !account.validatePassword(password)) {
    res.sendStatus(403)
    return
  }
  
  let token = null
  try {
    token = await account.generateToken()
  } catch (e) {
    console.error(e)
    res.status(500)
  }

  res.cookie('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
  res.json(account.profile)
}

exports.exists = async (req, res) => {
  const { key, value } = req.params
  let account = null
  try {
    account = await (key === 'email' ? Account.findByEmail(value) : Account.findByUsername(value))
  } catch (e) {
    console.error(e)
    res.status(500)
  }
  res.json({ exists: account !== null })
}

exports.logout = (req, res) => {
  res.clearCookie('access_token')
  res.sendStatus(204)
}

exports.check = (req, res) => {
  const { user } = req
  if (!user) {
    res.sendStatus(403)
    return
  }
  res.json(user.profile)
}