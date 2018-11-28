const SocketIO = require('socket.io')
const redis = require('redis')

const subscriber = redis.createClient()

subscriber.subscribe('posts')

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/ws'})

  app.set('io', io)

  const listener = (channel, message) => {
    io.send(message)
  }

  subscriber.on('message', listener)

  io.on('close', () => {
    subscriber.removeListener('message', listener)
  })

}