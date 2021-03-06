require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { jwtMiddleware } = require('./lib/token')
const morgan = require('morgan')
const port = process.env.PORT || 4000
const webSocket = require('./ws')
const history = require('connect-history-api-fallback')
const path = require('path')

const apiRouter = require('./api')

const app = express()

mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  dbName: 'reactauth',
  useNewUrlParser: true
}, err => {
  if (err) {
    console.log('mongodb error :', err)
  } else {
    console.log('mongodb connected.')
  }
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, '../../client/build')))
app.use(jwtMiddleware)
app.use(history())

app.use('/api', apiRouter)

const server = app.listen(port, () => {
  console.log('App listening on port ' + port);
});

webSocket(server, app)