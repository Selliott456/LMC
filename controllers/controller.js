const Reports = require('../models/report')

function getReports(req, res) {
  res.send(Reports)
}

function addReport(req, res) {
  Reports.push(req.body)
  res.send(req.body)
}

function singleReport(req, res) {
  const date = req.params.date
  const report = Reports.filter(report => {
    return report.date == date
  })
  res.send(report[0])
}

module.exports = {
  getReports,
  addReport,
  singleReport
}