const SocketIO = require('socket.io')
const redis = require('redis')

const publisher = redis.createClient()
const subscriber = redis.createClient()

subscriber.subscribe('posts')

let counter = 0

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io'})

  app.set('io', io)

  io.id = counter++
  io.send(`Hello, user ${io.id}`)

  io.on('message', message => {
    publisher.publish('posts', message)
  })

  io.on('close', () => {
    console.log(`User ${io.id} has left.`)
  })
}