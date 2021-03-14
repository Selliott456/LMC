// const reportData = [
  // {
    // date: 'the date',
    // painType: 'pain',
    // aura: '',
    // intensity: 'severe',
    // nausea: 'no',
    // bloating: 'no',
    // jawClenching: 'yes',
    // brainFog: '3',
    // mood: '3',
    // other: 'no',
    // medication: 'ibuprofen',
    // effective: 'yes'
  // }
// ]

//! set up schema
const mongoose = require('mongoose')
//constructor to create instance of mogoose schema class
// takes an object as an argument
const reportSchema = new mongoose.Schema({
  date: { type: String, required: true },
  painType: { type: String, required: false },
  aura: { type: String, required: false },
  intensity: { type: String, required: false },
  nausea: { type: String, required: false },
  bloating: { type: String, required: false },
  jawClenching: { type: String, required: false },
  brainFog: { type: Number, required: false },
  mood: { type: Number, required: false },
  other: { type: String, required: false },
  medication: { type: String, required: false },
  effective: { type: String, required: false }
})

// register schema as a model (loose example of instance of the class/Schema)
//first arg is singular of what your model is building
// second arg is the name of the schema
module.exports = mongoose.model('Report', reportSchema)