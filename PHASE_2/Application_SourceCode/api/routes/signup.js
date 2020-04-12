var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();

const dbPath = __dirname + '/databases/user.db'
const db = new sqlite3.Database(dbPath)

router.post('/', function(req, res) {
    const sql = `INSERT INTO User(username, password, dob) VALUES(?,?,?)`
    db.run(sql, [req.body.username, req.body.password, req.body.dob], (err) => {
        if (err) {
            throw err;
        }
    })
})

module.exports = router;