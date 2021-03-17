const report = require('../models/report')
const Report = require('../models/report')

function getUserReports(req, res) {
  //admin
  Report
    .find()
    .then(reportList => {
      res.send(reportList)
    })
    .catch(error => res.send(error))
}


function addReport(req, res) {
  req.body.user = req.currentUser
  Report
    .create(req.body)
    .then(report => {
      res.send(report)
    })
    .catch(error => res.send(error))
}


function removeReport(req, res) {
  const date = req.params.date
  const reportIndex = Report.findIndex(report => report.date === date)
  Report.splice(reportIndex, 1)
  res.status(204).send()
}



module.exports = {
  addReport,
  removeReport,
  getUserReports
}