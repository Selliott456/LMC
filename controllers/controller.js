const Report = require('../models/report')

function getReports(req, res) {
  res.send(Report)
}

function addReport(req, res) {
  Report.push(req.body)
  res.send(req.body)
}

function singleReport(req, res) {
  const date = req.params.date
  const report = Report.filter(report => {
    return report.date == date
  })
  res.send(report[0])
}

module.exports = {
  getReports,
  addReport,
  singleReport
}