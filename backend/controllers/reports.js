const Report = require('../models/report')

function getReports(req, res) {
  Report
    .find()
    .then(reportList => {
      res.send(reportList)
    })
}


function addReport(req, res) {
  const report = req.body
  Report
    .create(report)
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
  removeReport
}