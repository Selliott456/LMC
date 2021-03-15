
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

// ! This is our secureRoute middleware, to check if the token the user has
// ! sent EXISTS and is a VALID token.
function secureRoute(req, res, next) {
  // ! get the token from our request header
  const authToken = req.headers.authorization
  console.log(authToken)

  // ! If there's no token, or it doens't start with bearer, its unauthorized
  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Unauthorized '})
  }

  // ! Remove the bearer and space from the token
  const token = authToken.replace('Bearer ', '')

  // ! VERIFY the token. Check its not expired, that its a valid token.
  // ! Takes the token itself, the secret, function to run once this is
  // ! verified
  jwt.verify(token, secret, (err, payload) => {
    // ! payload is the data we stored INSIDE the token
    // ! grab the user ID.
    if (err) return res.status(401).send({ message: 'Unauthorized '})

    const userId = payload.sub
    // Find the user from mongo DB
    User
      .findById(userId)
      .then(user => {
        // ! We can't find a user, so your unauthorized
        if (!user) return res.status(401).send({ message: 'Unauthorized '})

        // ! Attach the user to our request, as currentUser
        req.currentUser = user

        // * This is valid USER
        next()
      })
      .catch(() => res.status(401).send({ message: 'Unauthorized '}))
  })
}

module.exports = secureRoute