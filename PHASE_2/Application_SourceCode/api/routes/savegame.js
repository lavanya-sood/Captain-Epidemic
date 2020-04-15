var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();


router.post('/', function(req, res) {
    const dbPath = __dirname + '/databases/user.db'
    const db = new sqlite3.Database(dbPath)
    const sql = `INSERT INTO Quiz(username, quiz,score) VALUES(?,?,10)`
    db.run(sql, [req.body.username, req.body.quiz], (err) => {
        if (err) {
            throw err;
        }
    })
    db.close()
    console.log("save game!!");

})

module.exports = router;