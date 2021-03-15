const User = require('../models/user')
const router = require('../router')
const jwt = require('jsonwebtoken')
const secret = require('../config/environment')

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
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      const token = jwt.sign(
        { sub: user._id },
        secret,
        { expiresIn: '6h' }
      )
      res.status(202).send({ message: 'Login successful!' })
    })
}

module.exports = {
  createUser,
  loginUser
}