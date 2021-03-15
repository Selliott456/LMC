const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function createUser(req, res) {
  const body = req.body
  User
    .create(body)
    .then(user => {
      res.send(user)
    })
    .catch(error => res.send(error))
}

function loginUser(req, res) {
  // ! 1) find the user who I'm logging in with
  User
    .findOne({ email: req.body.email })
    .then(user => {
      // ! IF this is NOT a valid password
      if (!user.validatePassword(req.body.password)) {
        // ! 401 -> unauthorized
        return res.status(401).send({ message: 'Unauthorized' })
      }
      const token = jwt.sign(
        { sub: user._id },
        secret,
        { expiresIn: '6h' }
      ) // This will create a long string, my token
      res.status(202).send({ token, message: 'Login was successful!' })
    })
    .catch(error => res.send(error))
}

module.exports = {
  createUser,
  loginUser
}