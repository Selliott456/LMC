const Report = require('../models/report')

function getUserReports(req, res) {
  Report
    .find()
    .then(reportList => {
      res.send(reportList)
    })
    .catch(error => res.send(error))
}

function getReports(req, res) {
  if (!req.currentUser.isAdmin) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  Report
    .find()
    .then(reportList => {
      res.send(reportList)
    })
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

function singleReport(req, res) {
  const date = req.params.date
  const report = Report.filter(report => {
    return report.date === date
  })
  res.send(report[0])
}

function removeReport(req, res) {
  const date = req.params.date
  const reportIndex = Report.findIndex(report => report.date === date)
  Report.splice(reportIndex, 1)
  res.status(204).send()
}



module.exports = {
  getReports,
  addReport,
  singleReport,
  removeReport,
  getUserReports
}