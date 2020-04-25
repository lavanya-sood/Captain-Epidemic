var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();

router.get('/countries', function(req, res, next) {
    const dbPath = __dirname + '/databases/who.db'
    const db = new sqlite3.Database(dbPath)
    var sql = `SELECT r.url as url, l.Country as country, a.date_of_publication as date FROM  Disease as d JOIN Report as r on r.id = d.ReportID JOIN Location as l on l.ReportID = r.id JOIN Article as a on a.url = r.url WHERE d.Disease = ?`
    db.all(sql, [disease], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(getCountries(rows))
    });
    db.close()
});

module.exports = router;
