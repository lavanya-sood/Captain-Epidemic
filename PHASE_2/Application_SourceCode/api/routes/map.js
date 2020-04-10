var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();

const dbPath = __dirname + '/databases/map.db'
console.log(dbPath)
const db = new sqlite3.Database(dbPath)

function getDiseases() {
    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear(); 
    var lastmonth = month - 1
    var lastyear = year
    if (month == 0) {
        lastmonth = 12
        lastyear = year - 1
    }
    var time = 'T23%3A59%3A59'
    var end_date = year+'-'+month+'-'+date+time
    var start_date = lastyear+'-'+lastmonth+'-'+date+time
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest()
    request.open('GET', 'http://calmclams.appspot.com/disease_reports?start_date=' + start_date + '&end_date='+end_date, true)
    request.onload = function () {
        if (request.status == 200) {
            const a = JSON.parse(request.responseText)
            const articles = JSON.stringify(a.articles)
            const sql = `INSERT INTO calmclams(accessed, response) VALUES(?,?)`
            db.run(sql, [year+'-'+month+'-'+date, articles], (err) => {
                if (err) {
                    throw err;
                }
            })
        }
    }
    request.send()
}




router.post('/', function(req, res) {
    getDiseases()
    res.send('hi')
})

module.exports = router;