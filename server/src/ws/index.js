const express = require('express')
const SocketIO = require('socket.io')

const ws = express()

let counter = 0

ws.get('/ws', (req, res, next) => {
  const io = SocketIO
})

module.exports = ws