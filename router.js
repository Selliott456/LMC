const express = require('express')
//express router to be used
const router = express.Router()
const Reports = require('./models/report')
//routes:

router.route('/data')
  .get((req, res) => {
    res.send(Reports)
  })

router.route('/data')
module.exports = router