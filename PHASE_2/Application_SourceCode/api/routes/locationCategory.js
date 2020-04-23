var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();

function getCountries(countries) {
  country_list = [];
  for (var i = 0; i < countries.length; i++) {
    country_list.push(countries[i].Country);
  }
  return country_list;
}

router.get("/", function (req, res, next) {
  const dbPath = __dirname + "/databases/who.db";
  const db = new sqlite3.Database(dbPath);
  var sql = `SELECT DISTINCT Country FROM Location`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(getCountries(rows));
    console.log(rows);
  });
  db.close();
});

module.exports = router;
