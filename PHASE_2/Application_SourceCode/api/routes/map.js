var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();

function getDiseases() {
    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear(); 
    var lastmonth = month - 1
    var lastyear = year
    if (month == 0) {
        lastmonth = 12
        lastyear = year - 1
    }
    var time = 'T23%3A59%3A59'
    var end_date = year+'-'+month+'-'+date+time
    var start_date = lastyear+'-'+lastmonth+'-'+date+time
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest()
    request.open('GET', 'http://calmclams.appspot.com/disease_reports?start_date=' + start_date + '&end_date='+end_date, true)
    request.onload = function () {
        if (request.status == 200) {
            const a = JSON.parse(request.responseText)
            const articles = JSON.stringify(a.articles)
            const dbPath = __dirname + '/databases/map.db'
            const db = new sqlite3.Database(dbPath)
            const sql = `INSERT INTO calmclams(accessed, response) VALUES(?,?)`
            db.run(sql, [year+'-'+month+'-'+date, articles], (err) => {
                if (err) {
                    throw err;
                }
            })
            db.close()
        }
    }
    request.send()
}

router.post('/', function(req, res) {
    getDiseases()
})


var diseases = [
    { "name": "unknown", "type": "germIcon" },
    { "name": "other", "type": "germIcon" },
    { "name": "anthrax cutaneous", "type": "bacteriaIcon", "title": "anthrax" },
    { "name": "anthrax gastrointestinous", "type": "bacteriaIcon", "title": "anthrax" },
    { "name": "anthrax inhalation","type": "bacteriaIcon", "title": "anthrax" },
    { "name": "botulism", "type": "bacteriaIcon" },
    { "name": "brucellosis", "type": "bacteriaIcon" },
    { "name": "chikungunya", "type": "virusIcon" },
    { "name": "cholera", "type": "bacteriaIcon"},
    { "name": "cryptococcosis", "type": "fungusIcon" },
    { "name": "cryptosporidiosis", "type": "parasiteIcon" },
    { "name": "crimean-congo haemorrhagic fever", "type": "virusIcon" },
    { "name": "dengue", "type": "virusIcon" },
    { "name": "diphteria", "type": "bacteriaIcon" },
    { "name": "ebola haemorrhagic fever", "type": "virusIcon", "title": "ebola" },
    { "name": "ehec (e.coli)", "type": "bacteriaIcon" },
    { "name": "enterovirus 71 infection", "type": "virusIcon", "title": "enterovirus" },
    { "name": "influenza a/h5n1", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h7n9", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h9n2", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h1n1", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h1n2", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h3n5", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h3n2", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h2n2", "type": "virusIcon", "title": "influenza" },
    { "name": "hand, foot and mouth disease", "type": "virusIcon" },
    { "name": "hantavirus", "type": "virusIcon" },
    { "name": "hepatitis a", "type": "virusIcon" },
    { "name": "hepatitis b", "type": "virusIcon" },
    { "name": "hepatitis c", "type": "virusIcon" },
    { "name": "hepatitis d", "type": "virusIcon" },
    { "name": "hepatitis e", "type": "virusIcon" },
    { "name": "histoplasmosis", "type": "fungusIcon" },
    { "name": "hiv/aids", "type": "virusIcon" },
    { "name": "lassa fever", "type": "virusIcon" },
    { "name": "malaria", "type": "parasiteIcon" },
    { "name": "marburg virus disease", "type": "virusIcon" },
    { "name": "measles", "type": "virusIcon" },
    { "name": "mers-cov", "type": "virusIcon" },
    { "name": "mumps", "type": "virusIcon" },
    { "name": "nipah virus", "type": "virusIcon" },
    { "name": "norovirus infection", "type": "virusIcon" },
    { "name": "pertussis", "type": "bacteriaIcon" },
    { "name": "plague", "type": "bacteriaIcon" },
    { "name": "pneumococcus pneumonia", "type": "bacteriaIcon", "title": "bacterial pneumonia" },
    { "name": "poliomyelitis", "type": "virusIcon", "title": "polio" },
    { "name": "q fever", "type": "bacteriaIcon" },
    { "name": "rabies", "type": "virusIcon" },
    { "name": "rift valley fever", "type": "virusIcon" },
    { "name": "rotavirus infection", "type": "virusIcon" },
    { "name": "rubella", "type": "virusIcon" },
    { "name": "salmonellosis", "type": "bacteriaIcon", "title": "salmonella" },
    { "name": "sars", "type": "virusIcon" },
    { "name": "shigellosis", "type": "bacteriaIcon" },
    { "name": "smallpox", "type": "virusIcon" },
    { "name": "staphylococcal enterotoxin b", "type": "bacteriaIcon", "title": "enterotoxin disease" },
    { "name": "thypoid fever", "type": "bacteriaIcon" },
    { "name": "tuberculosis", "type": "bacteriaIcon" },
    { "name": "tularemia", "type": "bacteriaIcon" },
    { "name": "vaccinia and cowpox", "type": "virusIcon", "title": "cowpox" },
    { "name": "varicella", "type": "virusIcon", "title": "chickenpox" },
    { "name": "west nile virus", "type": "virusIcon" },
    { "name": "yellow fever", "type": "virusIcon" },
    { "name": "yersiniosis", "type": "bacteriaIcon" },
    { "name": "zika", "type": "virusIcon" },
    { "name": "legionares", "type": "bacteriaIcon" },
    { "name": "listeriosis", "type": "bacteriaIcon" },
    { "name": "monkeypox", "type": "virusIcon" },
    { "name": "COVID-19", "type": "virusIcon", "title": "coronavirus" }
    ]

function getMapInfo(info) {
    var result = []
    for (var i = 0; i < info.length; i++) {
        for (var j = 0; j < info[i].reports.length;j++) {
            var disease = info[i].reports[j].diseases[0]
            var country = info[i].reports[j].locations[0].country
            var location = info[i].reports[j].locations[0].coords.split(', ')
            var lat = location[0]
            var lng = location[1]
            var date = info[i].reports[j].event_date.split(' ')[0]
            var year = date.split('-')[2]
            var month = date.split('-')[1]
            var day = date.split('-')[0]
            date = year+'/'+month+'/'+day
            var text = info[i].headline
            result.push({"disease": disease, "lat": lat, "lng": lng, "date": date, "text": text, "country": country, "key": i})
        }
    }
    return result
}

function getMapResult(result) {
    for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < diseases.length; j++) {
            if (diseases[j].name === result[i].disease) {
                result[i].name = diseases[j].name
                result[i].type = diseases[j].type
                if (diseases[j].title) {
                    result[i].name = diseases[j].title
                }
                result[i].name = result[i].name.charAt(0).toUpperCase() + result[i].name.slice(1)
                break
            }
        }
    }
    return result
}

router.get('/', function(req, res, next) {
    const dbPath = __dirname + '/databases/map.db'
    const db = new sqlite3.Database(dbPath)
    var curr_date = new Date().getDate(); 
    var curr_month = new Date().getMonth() + 1; 
    var curr_year = new Date().getFullYear(); 
    var date = curr_year+'-'+curr_month+'-'+curr_date
    var sql = `SELECT * FROM calmclams WHERE accessed = ?`
    db.get(sql, [date], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows) {
            var result = getMapInfo(JSON.parse(rows.response))
            var mapResult = getMapResult(result)
            res.json(mapResult);
        // just in case error occurs with calmclams api
        } else {
            sql = `SELECT * FROM calmclams ORDER BY accessed DESC LIMIT 1;`
            db.get(sql, [], (err,rows) => {
                if (err) {
                    throw err;
                }
                var result = getMapInfo(JSON.parse(rows.response))
                var mapResult = getMapResult(result)
                res.json(mapResult);
            })
        }
    });
    db.close()
});

module.exports = router;