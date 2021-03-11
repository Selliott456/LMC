const express = require('express')
//express router to be used
const router = express.Router()

//routes:

router.route('/data')
  .get((req, res) => {
    res.send('request all data')
  })

module.exports = router