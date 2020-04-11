var express = require('express');
var router = express.Router();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest()
request.open('GET', 'http://teletubbies-who-api.herokuapp.com/article?start_date=2018-01-01T00%3A00%3A00&end_date=2019-12-31T11%3A59%3A59', true)
request.onload = function () {
    if (request.status == 200) {
        //console.log(request.responseText)
        router.get('/', function(req, res, next) {
            res.json(request.responseText);
        });
    }
}
request.send()

module.exports = router;