var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();

function getTeletubbiesReports() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var lastmonth = month - 6
    var lastyear = year
    if (month < 7) {
        lastmonth = 12 - (6-month)
        lastyear = year - 1
    }
    if (month < 10) {
        month = '0' + month
    }
    if (lastmonth < 10) {
        lastmonth = '0' + lastmonth
    }
    var time = 'T23%3A59%3A59'
    var end_date = year+'-'+month+'-'+date+time
    var start_date = lastyear+'-'+lastmonth+'-'+date+time
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest()
    var url = 'http://teletubbies-who-api.herokuapp.com/article?start_date=' + start_date + '&end_date='+end_date
    request.open('GET', 'http://teletubbies-who-api.herokuapp.com/article?start_date=' + start_date + '&end_date='+end_date, true)
    request.onload = function () {
        if (request.status == 200) {
            const a = JSON.parse(request.responseText)
            const articles = JSON.stringify(a.result)
            const dbPath = __dirname + '/databases/map.db'
            const db = new sqlite3.Database(dbPath)
            const sql = `INSERT INTO teletubbies(accessed, response) VALUES(?,?)`
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

function formatDate(date) {
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    event_date = date.split(' ')[0]
    year = event_date.split('-')[0]
    month = event_date.split('-')[1]
    day = event_date.split('-')[2]
    if (month[0] == '0') {
        month = month[1]
    }
    if (day[0] == '0') {
        day = day[1]
    }
    if (month == 'xx') {
        month = ''
    }
    if (day == 'xx') {
        day = ''
    }
    if (year == 'xxxx') {
        year = ''
    }
    if (day == '' && month == '' && year == '') {
        return ''
    }
    return day + ' ' + months[month-1] + ' ' + year
}

var diseases = [
    { "name": "unknown", "type": "germIcon", "title": "unknown disease" },
    { "name": "other", "type": "germIcon", "title": "unknown disease"},
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

function formatDisease(disease) {
    for (var i = 0; i < diseases.length; i++) {
        if (disease == diseases[i].name) {
            if (diseases[i].title) {
                return diseases[i].title
            } else {
                return diseases[i].name
            }
        }
    }
}

function getType(disease) {
    for (var i = 0; i < diseases.length; i++) {
        if (disease == diseases[i].name) {
            return diseases[i].type
        }
    }
}

function getByCountry(country, results) {
    results = JSON.parse(results)
    epidemics = []
    for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < results[i].reports.length; j++) {
            for (var k = 0; k < results[i].reports[j].locations.length; k++) {
                if (country == results[i].reports[j].locations[k].country) {
                    for(var m = 0; m < results[i].reports[j].diseases.length; m++) {
                        var entry = {
                            disease: formatDisease(results[i].reports[j].diseases[m]),
                            type: getType(results[i].reports[j].diseases[m]),
                            location: results[i].reports[j].locations[k].location
                        }
                        epidemics.push(entry)
                    }
                }
            }
        }
    }
    seen = []
    locations = []
    for (i = 0; i < epidemics.length; i++) {
        check = 0
        for (j = 0; j < seen.length; j++) {
            if (epidemics[i].disease == seen[j].disease) {
                loc = 0
                for (k = 0; k < locations.length; k++) {
                    if (epidemics[i].location == locations[k]) {
                        loc = 1
                        break
                    }
                }
                if (loc == 0) {
                    seen[j].location = seen[j].location + ',' + epidemics[i].location
                    locations.push(epidemics[i].location)
                }
                check = 1;
                break;
            }
        }
        if (check == 0) {
            seen.push(epidemics[i])
            locations.push(epidemics[i].location)
        }
    }
    return seen
}

function convertDisease(d){
  var rightFormat = "False";

  if (d!="COVID-19"){
    d = d.toLowerCase()
  }
  for (var i = 0; i < diseases.length; i++) {
    if (d == diseases[i].name){
      rightFormat = "True";
    }
  }
  if (rightFormat == "False"){
    for (var j = 0; j < diseases.length; j++) {
      if (d == diseases[j].title){
        d = diseases[j].name;

      }
    }
  }
  return d
}

function getReportsByDisease(disease, results, flag) {
    results = JSON.parse(results)
    disease = convertDisease(disease)
    epidemics = []
    for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < results[i].reports.length; j++) {
            if (disease == results[i].reports[j].diseases[0]){ //not entering
              if (flag == 0) {
                  var entry = {
                      url: results[i].url,
                      headline: disease + ' update',
                      maintext: results[i].headline,
                      date: formatDate(results[i].reports[0].event_date)
                  }
                  epidemics.push(entry)
              } else {
                  var entry = {
                      url: results[i].url,
                      headline: results[i].headline,
                      maintext: results[i].main_text.split('.')[0],
                      date: formatDate(results[i].reports[0].event_date)
                  }
                  epidemics.push(entry)
              }

            }
        }
    }
    return epidemics
}

function getReportsByCountry(country, results, flag) {
    results = JSON.parse(results)
    epidemics = []
    for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < results[i].reports.length; j++) {
            for (var k = 0; k < results[i].reports[j].locations.length; k++) {
                if (country == results[i].reports[j].locations[k].country) {
                    if (flag == 0) {
                        var disease = results[i].reports[0].diseases[0]
                        if (disease === undefined) {
                            disease = 'unknown disease'
                        } else {
                            disease = formatDisease(disease)
                        }
                        var entry = {
                            url: results[i].url,
                            headline: disease + ' update',
                            maintext: results[i].headline,
                            date: formatDate(results[i].reports[0].event_date)
                        }
                        epidemics.push(entry)
                    } else {
                        var entry = {
                            url: results[i].url,
                            headline: results[i].headline,
                            maintext: results[i].main_text.split('.')[0],
                            date: formatDate(results[i].reports[0].event_date)
                        }
                        epidemics.push(entry)
                    }
                }
            }
        }
    }
    return epidemics
}
// adds reports to db from App.js
//getTeletubbiesReports()
router.post('/', function(req, res) {
    getTeletubbiesReports()
})

// get diseases by country from teletubbies
router.post('/diseases-teletubbies', function(req, res, next) {
    const country = req.body.country
    const dbPath = __dirname + '/databases/map.db'
    const db = new sqlite3.Database(dbPath)
    var curr_date = new Date().getDate();
    var curr_month = new Date().getMonth() + 1;
    if (curr_month < 10) {
        curr_month = '0' + curr_month
    }
    var curr_year = new Date().getFullYear();
    var date = curr_year+'-'+curr_month+'-'+curr_date
    var sql = `SELECT * FROM teletubbies WHERE accessed = ?`
    db.get(sql, [date], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows) {
            const epidemics = getByCountry(country, rows.response)
            res.json(epidemics)
        // just in case error occurs with calmclams api
        } else {
            sql = `SELECT * FROM teletubbies ORDER BY accessed DESC LIMIT 1;`
            db.get(sql, [], (err,rows) => {
                if (err) {
                    throw err;
                }
                const epidemics = getByCountry(country, rows.response)
                res.json(epidemics)
            })
        }
    });
    db.close()
})


// get reports by country from teletubbies
router.post('/reports-teletubbies', function(req, res, next) {
    country = req.body.country
    const dbPath = __dirname + '/databases/map.db'
    const db = new sqlite3.Database(dbPath)
    var curr_date = new Date().getDate();
    var curr_month = new Date().getMonth() + 1;
    if (curr_month < 10) {
        curr_month = '0' + curr_month
    }
    var curr_year = new Date().getFullYear();
    var date = curr_year+'-'+curr_month+'-'+curr_date
    var sql = `SELECT * FROM teletubbies WHERE accessed = ?`
    db.get(sql, [date], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows) {
            const epidemics = getReportsByCountry(country, rows.response, 1)
            res.json(epidemics)
        // just in case error occurs with calmclams api
        } else {
            sql = `SELECT * FROM teletubbies ORDER BY accessed DESC LIMIT 1;`
            db.get(sql, [], (err,rows) => {
                if (err) {
                    throw err;
                }
                const epidemics = getReportsByCountry(country, rows.response, 1)
                res.json(epidemics)
            })
        }
    });
    db.close()
})

router.post('/reports-teletubbies-d', function(req, res, next) {
    disease = req.body.disease
    const dbPath = __dirname + '/databases/map.db'
    const db = new sqlite3.Database(dbPath)
    var curr_date = new Date().getDate();
    var curr_month = new Date().getMonth() + 1;
    if (curr_month < 10) {
        curr_month = '0' + curr_month
    }
    var curr_year = new Date().getFullYear();
    var date = curr_year+'-'+curr_month+'-'+curr_date
    var sql = `SELECT * FROM teletubbies WHERE accessed = ?`
    db.get(sql, [date], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows) {
            const epidemics = getReportsByDisease(disease, rows.response, 1)
            res.json(epidemics)
        // just in case error occurs with calmclams api
        } else {
            sql = `SELECT * FROM teletubbies ORDER BY accessed DESC LIMIT 1;`
            db.get(sql, [], (err,rows) => {
                if (err) {
                    throw err;
                }
                const epidemics = getReportsByDisease(disease, rows.response, 1)
                res.json(epidemics)
            })
        }
    });
    db.close()
})

// get diseases by country from calmclams
router.post('/diseases-calmclams', function(req, res, next) {
    country = req.body.country
    const dbPath = __dirname + '/databases/map.db'
    const db = new sqlite3.Database(dbPath)
    var curr_date = new Date().getDate();
    var curr_month = new Date().getMonth() + 1;
    if (curr_month < 10) {
        curr_month = '0' + curr_month
    }
    var curr_year = new Date().getFullYear();
    var date = curr_year+'-'+curr_month+'-'+curr_date
    var sql = `SELECT * FROM calmclams WHERE accessed = ?`
    db.get(sql, [date], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows) {
            const epidemics = getByCountry(country, rows.response)
            res.json(epidemics)
        // just in case error occurs with calmclams api
        } else {
            sql = `SELECT * FROM calmclams ORDER BY accessed DESC LIMIT 1;`
            db.get(sql, [], (err,rows) => {
                if (err) {
                    throw err;
                }
                const epidemics = getByCountry(country, rows.response)
                res.json(epidemics)

            })
        }
    });
    db.close()
})

// get reports by country from calmclams
router.post('/reports-calmclams', function(req, res, next) {
    country = req.body.country
    const dbPath = __dirname + '/databases/map.db'
    const db = new sqlite3.Database(dbPath)
    var curr_date = new Date().getDate();
    var curr_month = new Date().getMonth() + 1;
    if (curr_month < 10) {
        curr_month = '0' + curr_month
    }
    var curr_year = new Date().getFullYear();
    var date = curr_year+'-'+curr_month+'-'+curr_date
    var sql = `SELECT * FROM calmclams WHERE accessed = ?`
    db.get(sql, [date], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows) {
            const epidemics = getReportsByCountry(country, rows.response, 0)
            res.json(epidemics)
        // just in case error occurs with calmclams api
        } else {
            sql = `SELECT * FROM calmclams ORDER BY accessed DESC LIMIT 1;`
            db.get(sql, [], (err,rows) => {
                if (err) {
                    throw err;
                }
                const epidemics = getReportsByCountry(country, rows.response, 0)
                res.json(epidemics)
            })
        }
    });
    db.close()
})

router.post('/reports-calmclams-d', function(req, res, next) {
    disease = req.body.disease
    const dbPath = __dirname + '/databases/map.db'
    const db = new sqlite3.Database(dbPath)
    var curr_date = new Date().getDate();
    var curr_month = new Date().getMonth() + 1;
    if (curr_month < 10) {
        curr_month = '0' + curr_month
    }
    var curr_year = new Date().getFullYear();
    var date = curr_year+'-'+curr_month+'-'+curr_date
    var sql = `SELECT * FROM calmclams WHERE accessed = ?`
    db.get(sql, [date], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows) {
            const epidemics = getReportsByDisease(disease, rows.response, 0)
            res.json(epidemics)
        // just in case error occurs with calmclams api
        } else {
            sql = `SELECT * FROM calmclams ORDER BY accessed DESC LIMIT 1;`
            db.get(sql, [], (err,rows) => {
                if (err) {
                    throw err;
                }
                const epidemics = getReportsByDisease(disease, rows.response, 0)
                res.json(epidemics)
            })
        }
    });
    db.close()
})


function checkCountries(country, countries) {
    for(var i = 0; i < countries.length; i++) {
        if (countries[i].Country === country) {
            return true
        }
    }
    return false
  }

router.post('/countries', function(req, res, next) {
    country = req.body.country
    const dbPath = __dirname + '/databases/who.db'
    const db = new sqlite3.Database(dbPath)
    var sql = `SELECT DISTINCT Country FROM Location`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(checkCountries(country, rows))
    });
    db.close()
});

module.exports = router;
