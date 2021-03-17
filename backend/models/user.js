const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongooseHidden = require('mongoose-hidden')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //! adding an admin user
  isAdmin: { type: Boolean }
})

schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))
//activate plugin to make sure email and user are unique
schema.plugin(uniqueValidator)

schema
  .pre('save', function hashPassword(next){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    next()
  })

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', schema)