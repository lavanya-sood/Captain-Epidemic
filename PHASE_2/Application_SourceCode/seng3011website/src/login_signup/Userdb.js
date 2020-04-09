const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('../databases/user.db')

function checkUser(username, password) {
    const sql = `SELECT * FROM User`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].username == username && rows[i].password == password) {
                // update localstorage with react
                
                console.log('user found')
                return;
            }
        }
        console.log('user not found')
    });
}

checkUser('emily', '123')

db.close()