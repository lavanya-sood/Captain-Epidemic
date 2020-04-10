var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const dbPath = __dirname + '/databases/user.db'
const db = new sqlite3.Database(dbPath)

const sql = `SELECT * FROM User`
db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    router.get('/', function(req, res, next) {
        res.json(rows);
    });
});

db.close()

module.exports = router;