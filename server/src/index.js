require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { jwtMiddleware } = require('./lib/token')
const morgan = require('morgan')
const port = process.env.PORT || 4000

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
app.use(jwtMiddleware)

app.use('/api', apiRouter)

app.listen(port, () => {
  console.log('App listening on port ' + port);
});