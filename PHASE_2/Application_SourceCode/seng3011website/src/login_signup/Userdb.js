const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('../databases/user.db')

const sql = `SELECT * FROM User`

db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    console.log(rows);
});

db.close()