const SocketIO = require('socket.io')

let counter = 0

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io'})

  app.set('io', io)

  io.id = counter++
  io.send(`Hello, user ${io.id}`)

  io.on('message', message => {
    console.log('message :', message)
    io.send('pong')
  })

  io.on('close', () => {
    console.log(`User ${io.id} has left.`)
  })
}