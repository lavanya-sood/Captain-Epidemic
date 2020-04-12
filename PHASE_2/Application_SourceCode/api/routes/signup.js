var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();



router.post('/', function(req, res) {
    const dbPath = __dirname + '/databases/user.db'
    const db = new sqlite3.Database(dbPath)
    const sql = `INSERT INTO User(username, password, dob, image) VALUES(?,?,?,?)`
    db.run(sql, [req.body.username, req.body.password, req.body.dob, req.body.image], (err) => {
        if (err) {
            throw err;
        }
    })
    db.close()
})

module.exports = router;