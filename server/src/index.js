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

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', apiRouter)

app.listen(port, () => {
  console.log('App listening on port ' + port);
});