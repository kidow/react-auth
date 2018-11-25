const express = require('express')

const apiRouter = require('./api')

const app = express()

app.use('/api', apiRouter)

app.listen(4000, () => {
  console.log('App listening on port 4000!');
});