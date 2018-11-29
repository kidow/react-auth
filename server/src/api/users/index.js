const express = require('express')
const users = express.Router()

const usersCtrl = require('./users.controller')

users.get('/:username', usersCtrl.getProfile)
users.get('/:username/thumbnail', usersCtrl.getThumbnail)

module.exports = users