function getUsers(callback) {
    const sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('../databases/user.db')
    const sql = `SELECT * FROM User`
    db.all(sql, [], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            callback(rows)
        }
    });
    db.close()
}

export default getUsers;


