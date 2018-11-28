const SocketIO = require('socket.io')
const redis = require('redis')

const subscriber = redis.createClient()

subscriber.subscribe('posts')

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/ws' })

  app.set('io', io)

  io.on('connection', socket => {
    const listener = (channel, message) => {
      socket.send(message)
    }

    subscriber.on('message', listener)

    socket.on('disconnect', () => {
      subscriber.removeListener('message', listener)
    })
  })

}