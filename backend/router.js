const express = require('express')
//express router to be used
const router = express.Router()
const reportController = require('./controllers/reports')
const userController = require('./controllers/users')
const secureRoute = require('./middleware/secureRoute')

//routes:
router.route('/data')
  .get(reportController.getReports)
  .post(secureRoute, reportController.addReport)

router.route('/data/:date')
  .get(reportController.singleReport)


router.route('/signup')
  .post(userController.createUser)

router.route('/login')
  .post(userController.loginUser)


module.exports = router