var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();

router.post('/', function(req, res) {
    const dbPath = __dirname + '/databases/user.db'
    const db = new sqlite3.Database(dbPath)
    const sql = `UPDATE User SET image = ? WHERE username = ?`
    db.run(sql, [req.body.image,req.body.username], (err) => {
        if (err) {
            throw err;
        }
    })
    db.close()
})

module.exports = router;
