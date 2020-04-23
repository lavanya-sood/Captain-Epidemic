var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();


router.post('/', function(req, res) {
    const dbPath = __dirname + '/databases/user.db'
    const db = new sqlite3.Database(dbPath)
    const sql = `INSERT INTO Quiz(username, quiz,score) VALUES(?,?,?) WHERE NOT EXISTS (SELECT * FROM QUIZ WHERE USERNAME = ? AND QUIZ = ?)`
    db.run(sql, [req.body.username, req.body.quiz,req.body.score,req.body.username,req.body.quiz], (err) => {
        if (err) {
            throw err;
        }
    })
    db.close()
    console.log("save game!!");
})
//
// router.get('/', function(req, res,next) {
//     const dbPath = __dirname + '/databases/user.db'
//     const db = new sqlite3.Database(dbPath)
//     const sql = `SELECT * FROM Quiz`
//     db.run(sql, (err,num) => {
//         if (err) {
//             throw err;
//         }
//         res.json(num)
//     })
//     db.close()
//     console.log("get game!!");
// })

module.exports = router;
