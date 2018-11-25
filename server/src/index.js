require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
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

app.use('/api', apiRouter)

app.listen(4000, () => {
  console.log('App listening on port 4000!');
});