var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();


router.post('/', function(req, res) {
    const dbPath = __dirname + '/databases/user.db'
    const db = new sqlite3.Database(dbPath)
    const sql = `UPDATE Quiz SET SCORE = ? WHERE USERNAME = ? AND QUIZ = ?`
    db.run(sql, [req.body.score,req.body.username, req.body.quiz], (err) => {
        if (err) {
            throw err;
        }
    })
    db.close()
    console.log("save game!!");
})

module.exports = router;
