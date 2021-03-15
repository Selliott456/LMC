//import is still fairly new for node. Require is fully stable
const express = require('express')
const Router = require('./router')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect(
  'mongodb://localhost/lmc',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Mongoose connected successfully')
    }
  }
)

//express is a function that helps you create a webserver
const expressServer = express()

//logging
expressServer.use((req, res, next)=> {
  console.log(`incoming request, ${req.method} to ${req.url}`)
  next()
})

// prefixing all your routes. all requests for data will start with
// '/api'
expressServer.use(bodyParser.json())
expressServer.use(('/api', Router))

//port assigned for express to listen to
expressServer.listen(5000)
