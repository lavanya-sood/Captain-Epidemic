var express = require('express');
var router = express.Router();


function getSymptoms(){
  var end_date = "2018-12-01T00:00:00"
  var start_date = "2018-01-01T00:00:00"
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var request = new XMLHttpRequest()
  let url = 'http://teletubbies-who-api.herokuapp.com/article'
  request.open('GET', url + '?start_date=' + start_date + '&end_date='+end_date, true)
  request.onload = function () {
      if (request.status == 200) {
          const a = JSON.parse(request.responseText)
          const articles = JSON.stringify(a.articles)
          return articles
          // const articles = JSON.stringify(a.articles)
          // const sql = `INSERT INTO calmclams(accessed, response) VALUES(?,?)`
          // db.run(sql, [year+'-'+month+'-'+date, articles], (err) => {
          //     if (err) {
          //         throw err;
          //     }
          // })
      } else{
        console.log('xml error');
      }
      //request.send()
  }
  let v = "cough"
  return v
}

router.get('/', function(req, res) {
    getSymptoms()
})

module.exports = router;
