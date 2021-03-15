const mongoose = require('mongoose')
const Report = require('./models/report')
const User = require('./models/user')


mongoose.connect(
  'mongodb://localhost/lmc',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongoose Connected')
    //resets the database
    mongoose.connection.db.dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'allen',
            email: 'allen@email.com',
            password: 'password'
          },
          {
            username: 'lauren',
            email: 'lauren@email.com',
            password: 'password'
          }
        ])
      })
      .then(users => {
        console.log(`${users.length} users have been created`)
        return users
      })
      .then( (users) => {
        return Report.create([
          {
            date: 'the date',
            painType: 'pain',
            aura: '',
            intensity: 'severe',
            nausea: 'no',
            bloating: 'no',
            jawClenching: 'yes',
            brainFog: '3',
            mood: '3',
            other: 'no',
            medication: 'ibuprofen',
            effective: 'yes'
          },
          {
            date: 'the date',
            painType: 'pain',
            aura: '',
            intensity: 'severe',
            nausea: 'no',
            bloating: 'no',
            jawClenching: 'yes',
            brainFog: '3',
            mood: '3',
            other: 'no',
            medication: 'ibuprofen',
            effective: 'yes'
          } 
        ])
      })
      .then(reports => {
        console.log(`${reports.length} reports have been created`)
      })
      .catch(err =>{
        console.log(err)
      })
      .finally(() => {
        mongoose.connection.close()
      })
  }
)