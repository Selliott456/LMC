const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongooseHidden = require('mongoose-hidden')

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true }}))

schema
  .pre('save', function hashPassword(next){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    next()
  })

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', schema)