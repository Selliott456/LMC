const express = require('express')
//express router to be used
const router = express.Router()
const Reports = require('./models/report')
const controller = require('./controllers/controller')

//routes:

router.route('/data')
  .get(controller.getReports)
  .post(controller.addReport)

router.route('/data/:date')
  .get(controller.singleReport)
module.exports = router