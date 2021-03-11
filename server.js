//import is still fairly new for node. Require is fully stable

const express = require('express')

//express is a function that helps you create a webserver
const expressServer = express()

//logging
//use takes a function as an argument
//request object
//response object
//next - tells express to move on
expressServer.use((req, res, next)=> {
  console.log(`incoming request, ${req.method} to ${req.url}`)
  next()
})


//port assigned for express to listen to
expressServer.listen(5000)
