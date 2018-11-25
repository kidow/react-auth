const Joi = require('joi')
const Account = require('../../models/account')

exports.localRegister = async (req, res) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
  })

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.status(400)
    return
  }

  let existing = null
  try {
    existing = await Account.findByEmailOrUsername(req.body)
  } catch (e) {
    res.status(500)
    console.log(e)
  }

  if (existing) {
    res.status(409)
    res.json({ key: existing.email === req.body.email ? 'email' : 'username' })
    return
  }

  let account = null
  try {
    account = await Account.localRegister(req.body)
    res.json(account.profile)
  } catch (e) {
    res.status(500)
    console.log(e)
  }
};

exports.localLogin = async (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.status(400)
    return
  }

  const { email, password } = req.body

  let account = null
  try {
    account = await Account.findByEmail(email)
  } catch (e) {
    res.status(500)
    console.log(e)
  }

  if (!account || !account.validatePassword(password)) {
    res.status(403)
    return
  }

  res.json(account.profile)
};

exports.exists = async (req, res) => {
  res.send('exists');
};

exports.logout = async (req, res) => {
  res.send('logout');
};