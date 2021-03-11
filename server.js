//import is still fairly new for node. Require is fully stable
const express = require('express')
const Router = require('./router')


//express is a function that helps you create a webserver
const expressServer = express()

//logging
expressServer.use((req, res, next)=> {
  console.log(`incoming request, ${req.method} to ${req.url}`)
  next()
})

// prefixing all your routes. all requests for data will start with
// '/api'
expressServer.use(('/api', Router))

//port assigned for express to listen to
expressServer.listen(5000)
