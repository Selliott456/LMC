
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

// ! This is our secureRoute middleware, to check if the token the user has
// ! sent EXISTS and is a VALID token.
function secureRoute(req, res, next) {
  
  const authToken = req.headers.authorization
  console.log(authToken)

  
  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Unauthorized '})
  }

  const token = authToken.replace('Bearer ', '')

  
  jwt.verify(token, secret, (err, payload) => {
   
    if (err) return res.status(401).send({ message: 'Unauthorized '})

    const userId = payload.sub
    // Find the user from mongo DB
    User
      .findById(userId)
      .then(user => {
        if (!user) return res.status(401).send({ message: 'Unauthorized '})

        req.currentUser = user

        // * This is valid USER
        next()
      })
      .catch(() => res.status(401).send({ message: 'Unauthorized '}))
  })
}

module.exports = secureRoute