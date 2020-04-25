var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();

var diseasePage = ""

Array.prototype.byCount= function(){
    var itm, a= [], L= this.length, o= {};
    for(var i= 0; i<L; i++){
        itm= this[i];
        if(!itm) continue;
        if(o[itm]== undefined) o[itm]= 1;
        else ++o[itm];
    }
    for(var p in o) a[a.length]= p;
    return a.sort(function(a, b){
        return o[b]-o[a];
    });
}

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

router.post('/info', function(req, res) {
    getNewEntry(req.body.disease)
})

function getNewEntry(disease) {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var time = 'T00%3A00%3A00';
    var month_int = parseInt(month);
    if (month_int < 9){
      month = "0" + month;
    }
    var end_date = year+'-'+month+'-'+date+time
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest()
    var disease_new = disease.split(" ").join("%20")
    diseasePage = disease
    request.open('GET','https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2005-01-01T00%3A00%3A00&end_date=' + end_date + '&key=' + disease_new
, true)
    request.onload = function () {
        if (request.status == 200) {
            const a = JSON.parse(request.responseText)
            const articles = JSON.stringify(a)
            const dbPath = __dirname + '/databases/map.db'
            const db = new sqlite3.Database(dbPath)
            const sql = `INSERT OR IGNORE INTO emperor(accessed, response, disease, key) VALUES(?,?, ?, ?)`
            db.run(sql, [year+'-'+month+'-'+date, articles, disease, year+'-'+month+'-'+date+disease_new], (err) => {
                if (err) {
                    throw err;
                }
            })
            db.close()
        }
    }
    request.send()
}

var countryCodes = [{"id":4,"name":"Afghanistan","alpha2":"af","alpha3":"afg"},
{"id":8,"name":"Albania","alpha2":"al","alpha3":"alb"},
{"id":12,"name":"Algeria","alpha2":"dz","alpha3":"dza"},
{"id":20,"name":"Andorra","alpha2":"ad","alpha3":"and"},
{"id":24,"name":"Angola","alpha2":"ao","alpha3":"ago"},
{"id":28,"name":"Antigua and Barbuda","alpha2":"ag","alpha3":"atg"},
{"id":32,"name":"Argentina","alpha2":"ar","alpha3":"arg"},
{"id":51,"name":"Armenia","alpha2":"am","alpha3":"arm"},
{"id":36,"name":"Australia","alpha2":"au","alpha3":"aus"},
{"id":40,"name":"Austria","alpha2":"at","alpha3":"aut"},
{"id":31,"name":"Azerbaijan","alpha2":"az","alpha3":"aze"},
{"id":44,"name":"Bahamas","alpha2":"bs","alpha3":"bhs"},
{"id":48,"name":"Bahrain","alpha2":"bh","alpha3":"bhr"},
{"id":50,"name":"Bangladesh","alpha2":"bd","alpha3":"bgd"},
{"id":52,"name":"Barbados","alpha2":"bb","alpha3":"brb"},
{"id":112,"name":"Belarus","alpha2":"by","alpha3":"blr"},
{"id":56,"name":"Belgium","alpha2":"be","alpha3":"bel"},
{"id":84,"name":"Belize","alpha2":"bz","alpha3":"blz"},
{"id":204,"name":"Benin","alpha2":"bj","alpha3":"ben"},
{"id":64,"name":"Bhutan","alpha2":"bt","alpha3":"btn"},
{"id":68,"name":"Bolivia (Plurinational State of)","alpha2":"bo","alpha3":"bol"},
{"id":70,"name":"Bosnia and Herzegovina","alpha2":"ba","alpha3":"bih"},
{"id":72,"name":"Botswana","alpha2":"bw","alpha3":"bwa"},
{"id":76,"name":"Brazil","alpha2":"br","alpha3":"bra"},
{"id":96,"name":"Brunei Darussalam","alpha2":"bn","alpha3":"brn"},
{"id":100,"name":"Bulgaria","alpha2":"bg","alpha3":"bgr"},
{"id":854,"name":"Burkina Faso","alpha2":"bf","alpha3":"bfa"},
{"id":108,"name":"Burundi","alpha2":"bi","alpha3":"bdi"},
{"id":132,"name":"Cabo Verde","alpha2":"cv","alpha3":"cpv"},
{"id":116,"name":"Cambodia","alpha2":"kh","alpha3":"khm"},
{"id":120,"name":"Cameroon","alpha2":"cm","alpha3":"cmr"},
{"id":124,"name":"Canada","alpha2":"ca","alpha3":"can"},
{"id":140,"name":"Central African Republic","alpha2":"cf","alpha3":"caf"},
{"id":148,"name":"Chad","alpha2":"td","alpha3":"tcd"},
{"id":152,"name":"Chile","alpha2":"cl","alpha3":"chl"},
{"id":156,"name":"China","alpha2":"cn","alpha3":"chn"},
{"id":170,"name":"Colombia","alpha2":"co","alpha3":"col"},
{"id":174,"name":"Comoros","alpha2":"km","alpha3":"com"},
{"id":178,"name":"Congo","alpha2":"cg","alpha3":"cog"},
{"id":180,"name":"Congo, Democratic Republic of the","alpha2":"cd","alpha3":"cod"},
{"id":188,"name":"Costa Rica","alpha2":"cr","alpha3":"cri"},
{"id":384,"name":"Côte d'Ivoire","alpha2":"ci","alpha3":"civ"},
{"id":191,"name":"Croatia","alpha2":"hr","alpha3":"hrv"},
{"id":192,"name":"Cuba","alpha2":"cu","alpha3":"cub"},
{"id":196,"name":"Cyprus","alpha2":"cy","alpha3":"cyp"},
{"id":203,"name":"Czechia","alpha2":"cz","alpha3":"cze"},
{"id":208,"name":"Denmark","alpha2":"dk","alpha3":"dnk"},
{"id":262,"name":"Djibouti","alpha2":"dj","alpha3":"dji"},
{"id":212,"name":"Dominica","alpha2":"dm","alpha3":"dma"},
{"id":214,"name":"Dominican Republic","alpha2":"do","alpha3":"dom"},
{"id":218,"name":"Ecuador","alpha2":"ec","alpha3":"ecu"},
{"id":818,"name":"Egypt","alpha2":"eg","alpha3":"egy"},
{"id":222,"name":"El Salvador","alpha2":"sv","alpha3":"slv"},
{"id":226,"name":"Equatorial Guinea","alpha2":"gq","alpha3":"gnq"},
{"id":232,"name":"Eritrea","alpha2":"er","alpha3":"eri"},
{"id":233,"name":"Estonia","alpha2":"ee","alpha3":"est"},
{"id":748,"name":"Eswatini","alpha2":"sz","alpha3":"swz"},
{"id":231,"name":"Ethiopia","alpha2":"et","alpha3":"eth"},
{"id":242,"name":"Fiji","alpha2":"fj","alpha3":"fji"},
{"id":246,"name":"Finland","alpha2":"fi","alpha3":"fin"},
{"id":250,"name":"France","alpha2":"fr","alpha3":"fra"},
{"id":266,"name":"Gabon","alpha2":"ga","alpha3":"gab"},
{"id":270,"name":"Gambia","alpha2":"gm","alpha3":"gmb"},
{"id":268,"name":"Georgia","alpha2":"ge","alpha3":"geo"},
{"id":276,"name":"Germany","alpha2":"de","alpha3":"deu"},
{"id":288,"name":"Ghana","alpha2":"gh","alpha3":"gha"},
{"id":300,"name":"Greece","alpha2":"gr","alpha3":"grc"},
{"id":308,"name":"Grenada","alpha2":"gd","alpha3":"grd"},
{"id":320,"name":"Guatemala","alpha2":"gt","alpha3":"gtm"},
{"id":324,"name":"Guinea","alpha2":"gn","alpha3":"gin"},
{"id":624,"name":"Guinea-Bissau","alpha2":"gw","alpha3":"gnb"},
{"id":328,"name":"Guyana","alpha2":"gy","alpha3":"guy"},
{"id":332,"name":"Haiti","alpha2":"ht","alpha3":"hti"},
{"id":340,"name":"Honduras","alpha2":"hn","alpha3":"hnd"},
{"id":348,"name":"Hungary","alpha2":"hu","alpha3":"hun"},
{"id":352,"name":"Iceland","alpha2":"is","alpha3":"isl"},
{"id":356,"name":"India","alpha2":"in","alpha3":"ind"},
{"id":360,"name":"Indonesia","alpha2":"id","alpha3":"idn"},
{"id":364,"name":"Iran (Islamic Republic of)","alpha2":"ir","alpha3":"irn"},
{"id":368,"name":"Iraq","alpha2":"iq","alpha3":"irq"},
{"id":372,"name":"Ireland","alpha2":"ie","alpha3":"irl"},
{"id":376,"name":"Israel","alpha2":"il","alpha3":"isr"},
{"id":380,"name":"Italy","alpha2":"it","alpha3":"ita"},
{"id":388,"name":"Jamaica","alpha2":"jm","alpha3":"jam"},
{"id":392,"name":"Japan","alpha2":"jp","alpha3":"jpn"},
{"id":400,"name":"Jordan","alpha2":"jo","alpha3":"jor"},
{"id":398,"name":"Kazakhstan","alpha2":"kz","alpha3":"kaz"},
{"id":404,"name":"Kenya","alpha2":"ke","alpha3":"ken"},
{"id":296,"name":"Kiribati","alpha2":"ki","alpha3":"kir"},
{"id":408,"name":"North Korea","alpha2":"kp","alpha3":"prk"},
{"id":410,"name":"South Korea","alpha2":"kr","alpha3":"kor"},
{"id":414,"name":"Kuwait","alpha2":"kw","alpha3":"kwt"},
{"id":417,"name":"Kyrgyzstan","alpha2":"kg","alpha3":"kgz"},
{"id":418,"name":"Lao People's Democratic Republic","alpha2":"la","alpha3":"lao"},
{"id":428,"name":"Latvia","alpha2":"lv","alpha3":"lva"},
{"id":422,"name":"Lebanon","alpha2":"lb","alpha3":"lbn"},
{"id":426,"name":"Lesotho","alpha2":"ls","alpha3":"lso"},
{"id":430,"name":"Liberia","alpha2":"lr","alpha3":"lbr"},
{"id":434,"name":"Libya","alpha2":"ly","alpha3":"lby"},
{"id":438,"name":"Liechtenstein","alpha2":"li","alpha3":"lie"},
{"id":440,"name":"Lithuania","alpha2":"lt","alpha3":"ltu"},
{"id":442,"name":"Luxembourg","alpha2":"lu","alpha3":"lux"},
{"id":450,"name":"Madagascar","alpha2":"mg","alpha3":"mdg"},
{"id":454,"name":"Malawi","alpha2":"mw","alpha3":"mwi"},
{"id":458,"name":"Malaysia","alpha2":"my","alpha3":"mys"},
{"id":462,"name":"Maldives","alpha2":"mv","alpha3":"mdv"},
{"id":466,"name":"Mali","alpha2":"ml","alpha3":"mli"},
{"id":470,"name":"Malta","alpha2":"mt","alpha3":"mlt"},
{"id":584,"name":"Marshall Islands","alpha2":"mh","alpha3":"mhl"},
{"id":478,"name":"Mauritania","alpha2":"mr","alpha3":"mrt"},
{"id":480,"name":"Mauritius","alpha2":"mu","alpha3":"mus"},
{"id":484,"name":"Mexico","alpha2":"mx","alpha3":"mex"},
{"id":583,"name":"Micronesia (Federated States of)","alpha2":"fm","alpha3":"fsm"},
{"id":498,"name":"Moldova, Republic of","alpha2":"md","alpha3":"mda"},
{"id":492,"name":"Monaco","alpha2":"mc","alpha3":"mco"},
{"id":496,"name":"Mongolia","alpha2":"mn","alpha3":"mng"},
{"id":499,"name":"Montenegro","alpha2":"me","alpha3":"mne"},
{"id":504,"name":"Morocco","alpha2":"ma","alpha3":"mar"},
{"id":508,"name":"Mozambique","alpha2":"mz","alpha3":"moz"},
{"id":104,"name":"Myanmar","alpha2":"mm","alpha3":"mmr"},
{"id":516,"name":"Namibia","alpha2":"na","alpha3":"nam"},
{"id":520,"name":"Nauru","alpha2":"nr","alpha3":"nru"},
{"id":524,"name":"Nepal","alpha2":"np","alpha3":"npl"},
{"id":528,"name":"Netherlands","alpha2":"nl","alpha3":"nld"},
{"id":554,"name":"New Zealand","alpha2":"nz","alpha3":"nzl"},
{"id":558,"name":"Nicaragua","alpha2":"ni","alpha3":"nic"},
{"id":562,"name":"Niger","alpha2":"ne","alpha3":"ner"},
{"id":566,"name":"Nigeria","alpha2":"ng","alpha3":"nga"},
{"id":807,"name":"North Macedonia","alpha2":"mk","alpha3":"mkd"},
{"id":578,"name":"Norway","alpha2":"no","alpha3":"nor"},
{"id":512,"name":"Oman","alpha2":"om","alpha3":"omn"},
{"id":586,"name":"Pakistan","alpha2":"pk","alpha3":"pak"},
{"id":585,"name":"Palau","alpha2":"pw","alpha3":"plw"},
{"id":591,"name":"Panama","alpha2":"pa","alpha3":"pan"},
{"id":598,"name":"Papua New Guinea","alpha2":"pg","alpha3":"png"},
{"id":600,"name":"Paraguay","alpha2":"py","alpha3":"pry"},
{"id":604,"name":"Peru","alpha2":"pe","alpha3":"per"},
{"id":608,"name":"Philippines","alpha2":"ph","alpha3":"phl"},
{"id":616,"name":"Poland","alpha2":"pl","alpha3":"pol"},
{"id":620,"name":"Portugal","alpha2":"pt","alpha3":"prt"},
{"id":634,"name":"Qatar","alpha2":"qa","alpha3":"qat"},
{"id":642,"name":"Romania","alpha2":"ro","alpha3":"rou"},
{"id":643,"name":"Russian Federation","alpha2":"ru","alpha3":"rus"},
{"id":646,"name":"Rwanda","alpha2":"rw","alpha3":"rwa"},
{"id":659,"name":"Saint Kitts and Nevis","alpha2":"kn","alpha3":"kna"},
{"id":662,"name":"Saint Lucia","alpha2":"lc","alpha3":"lca"},
{"id":670,"name":"Saint Vincent and the Grenadines","alpha2":"vc","alpha3":"vct"},
{"id":882,"name":"Samoa","alpha2":"ws","alpha3":"wsm"},
{"id":674,"name":"San Marino","alpha2":"sm","alpha3":"smr"},
{"id":678,"name":"Sao Tome and Principe","alpha2":"st","alpha3":"stp"},
{"id":682,"name":"Saudi Arabia","alpha2":"sa","alpha3":"sau"},
{"id":686,"name":"Senegal","alpha2":"sn","alpha3":"sen"},
{"id":688,"name":"Serbia","alpha2":"rs","alpha3":"srb"},
{"id":690,"name":"Seychelles","alpha2":"sc","alpha3":"syc"},
{"id":694,"name":"Sierra Leone","alpha2":"sl","alpha3":"sle"},
{"id":702,"name":"Singapore","alpha2":"sg","alpha3":"sgp"},
{"id":703,"name":"Slovakia","alpha2":"sk","alpha3":"svk"},
{"id":705,"name":"Slovenia","alpha2":"si","alpha3":"svn"},
{"id":90,"name":"Solomon Islands","alpha2":"sb","alpha3":"slb"},
{"id":706,"name":"Somalia","alpha2":"so","alpha3":"som"},
{"id":710,"name":"South Africa","alpha2":"za","alpha3":"zaf"},
{"id":728,"name":"South Sudan","alpha2":"ss","alpha3":"ssd"},
{"id":724,"name":"Spain","alpha2":"es","alpha3":"esp"},
{"id":144,"name":"Sri Lanka","alpha2":"lk","alpha3":"lka"},
{"id":729,"name":"Sudan","alpha2":"sd","alpha3":"sdn"},
{"id":740,"name":"Suriname","alpha2":"sr","alpha3":"sur"},
{"id":752,"name":"Sweden","alpha2":"se","alpha3":"swe"},
{"id":756,"name":"Switzerland","alpha2":"ch","alpha3":"che"},
{"id":760,"name":"Syrian Arab Republic","alpha2":"sy","alpha3":"syr"},
{"id":762,"name":"Tajikistan","alpha2":"tj","alpha3":"tjk"},
{"id":834,"name":"Tanzania, United Republic of","alpha2":"tz","alpha3":"tza"},
{"id":764,"name":"Thailand","alpha2":"th","alpha3":"tha"},
{"id":626,"name":"Timor-Leste","alpha2":"tl","alpha3":"tls"},
{"id":768,"name":"Togo","alpha2":"tg","alpha3":"tgo"},
{"id":776,"name":"Tonga","alpha2":"to","alpha3":"ton"},
{"id":780,"name":"Trinidad and Tobago","alpha2":"tt","alpha3":"tto"},
{"id":788,"name":"Tunisia","alpha2":"tn","alpha3":"tun"},
{"id":792,"name":"Turkey","alpha2":"tr","alpha3":"tur"},
{"id":795,"name":"Turkmenistan","alpha2":"tm","alpha3":"tkm"},
{"id":798,"name":"Tuvalu","alpha2":"tv","alpha3":"tuv"},
{"id":800,"name":"Uganda","alpha2":"ug","alpha3":"uga"},
{"id":804,"name":"Ukraine","alpha2":"ua","alpha3":"ukr"},
{"id":784,"name":"United Arab Emirates","alpha2":"ae","alpha3":"are"},
{"id":826,"name":"United Kingdom","alpha2":"gb","alpha3":"gbr"},
{"id":840,"name":"United States","alpha2":"us","alpha3":"usa"},
{"id":858,"name":"Uruguay","alpha2":"uy","alpha3":"ury"},
{"id":860,"name":"Uzbekistan","alpha2":"uz","alpha3":"uzb"},
{"id":548,"name":"Vanuatu","alpha2":"vu","alpha3":"vut"},
{"id":862,"name":"Venezuela (Bolivarian Republic of)","alpha2":"ve","alpha3":"ven"},
{"id":704,"name":"Viet Nam","alpha2":"vn","alpha3":"vnm"},
{"id":887,"name":"Yemen","alpha2":"ye","alpha3":"yem"},
{"id":894,"name":"Zambia","alpha2":"zm","alpha3":"zmb"},
{"id":716,"name":"Zimbabwe","alpha2":"zw","alpha3":"zwe"}]

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


function getDiseaseNames(disease) {
    disease = disease.toLowerCase()
    disease_names = []
    for(var i = 0; i < diseases.length; i++) {
        if (diseases[i].title) {
            disease_names.push(diseases[i].title)
        } else {
            disease_names.push(diseases[i].name)
        }
    }
    for (i = 0; i < disease_names.length; i++) {
        if (disease_names[i] === disease) {
            return true
        }
    }
    return false
}

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

function getSymptoms(info){
  var result = []
  for (var i = 0; i < info.length; i++) {
      for (var j = 0; j < info[i].reports.length;j++) { //for every report
          for (var k = 0;k<info[i].reports[j].syndromes.length;k++){ //for every list of syndromes
            //if it's not unknown or asymptomatic or repeat
              result = addSyndrome(result,info[i].reports[j].syndromes[k])
          }
      }
  }

  result.sort(function(a, b){return a.length - b.length});
  var len = result.unshift(getType(diseasePage.toLowerCase()))
  result = result.slice(0, 5);
  return result
}

function addSyndrome(result, syndrome){
  if(!result.includes(syndrome) && syndrome != "unknown" && syndrome != "Asymptomatic" && syndrome != "Sputum"){
    result.push(syndrome)
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

function getType(disease) {
    for (var i = 0; i < diseases.length; i++) {
        if (disease == diseases[i].name || disease == diseases[i].title) {
            return diseases[i].type
        }
    }
}

router.get('/symptoms', function(req, res, next) {
    const dbPath = __dirname + '/databases/map.db'
    const db = new sqlite3.Database(dbPath)
    var curr_date = new Date().getDate();
    var curr_month = new Date().getMonth() + 1;
    if (parseInt(curr_month) < 9) {
        curr_month = "0" + curr_month
    }
    var curr_year = new Date().getFullYear();
    var date = curr_year+'-'+curr_month+'-'+curr_date
    var sql = `SELECT * FROM emperor WHERE disease = ? ORDER BY accessed DESC LIMIT 1;`
            db.get(sql, [diseasePage], (err,rows) => {
                if (err) {
                    throw err;
                }
                var result = getSymptoms(JSON.parse(rows.response))
                //var mapResult = getMapResult(result)
                //console.log(result)
                res.send(result);
            })
    db.close()
});

function getCountries(countries) {
    country_list = []
    for(var i = 0; i < countries.length; i++) {
        country_list.push(countries[i].Country)
    }
    return country_list
}

router.get('/countries', function(req, res, next) {
    const dbPath = __dirname + '/databases/who.db'
    const db = new sqlite3.Database(dbPath)
    var sql = `SELECT DISTINCT Country FROM Location`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(getCountries(rows))
    });
    db.close()
});

router.post('/diseases', function(req, res, next) {
    const disease = req.body.disease
    res.json(getDiseaseNames(disease))
});

router.get('/countriesdisease', function(req, res, next) {
    const dbPath = __dirname + '/databases/who.db'
    const db = new sqlite3.Database(dbPath)
    //console.log(diseasePage)
    var disease_copy = diseasePage
    var d = convertDisease(disease_copy)
    var sql = `SELECT * FROM  Disease as d JOIN Report as r on r.id = d.ReportID JOIN Location as l on l.ReportID = r.id JOIN Article as a on a.url = r.url WHERE d.Disease = ?`
    db.all(sql, [d], (err, rows) => {
        if (err) {
            throw err;
        }
        var result = getTopCodes(rows)
        //var mapResult = getMapResult(result)
        res.send(result);
    });
    db.close()
});

router.get('/countriesdisease2', function(req, res, next) {
    const dbPath = __dirname + '/databases/who.db'
    const db = new sqlite3.Database(dbPath)
    //console.log(diseasePage)
    var disease_copy = diseasePage
    var d = convertDisease(disease_copy)
    var sql = `SELECT * FROM  Disease as d JOIN Report as r on r.id = d.ReportID JOIN Location as l on l.ReportID = r.id JOIN Article as a on a.url = r.url WHERE d.Disease = ?`
    db.all(sql, [d], (err, rows) => {
        if (err) {
            throw err;
        }
        var result = getTopCountries(rows)
        //var mapResult = getMapResult(result)
        res.send(result);
    });
    db.close()
});

router.get('/diseasereports', function(req, res, next) {
    const dbPath = __dirname + '/databases/who.db'
    const db = new sqlite3.Database(dbPath)
    //console.log(diseasePage)
    var disease_copy = diseasePage
    var d = convertDisease(disease_copy)
    var sql = `SELECT * FROM  Disease as d JOIN Report as r on r.id = d.ReportID JOIN Location as l on l.ReportID = r.id JOIN Article as a on a.url = r.url WHERE d.Disease = ?`
    db.all(sql, [d], (err, rows) => {
        if (err) {
            throw err;
        }
        var result = getTopCountries(rows)
        //var mapResult = getMapResult(result)
        res.send(result);
    });
    db.close()
});

function getTopCountries(info){
  result = []
  for (var i = 0; i < info.length; i++) {
      result.push(info[i].Country)
  }
  result = result.byCount()
  result = result.slice(0,6)
  codes = []
  for (var j = 0;j < result.length; j++){
    for (var k = 0; k < countryCodes.length; k++){
      if (countryCodes[k].name == result[j]){
        codes.push(countryCodes[k].alpha2);
      }
    }
  }
  console.log(result)
  return result
}

function getTopCodes(info){
  result = []
  for (var i = 0; i < info.length; i++) {
      result.push(info[i].Country)
  }
  result = result.byCount()
  result = result.slice(0,6)
  codes = []
  for (var j = 0;j < result.length; j++){
    for (var k = 0; k < countryCodes.length; k++){
      if (countryCodes[k].name == result[j]){
        codes.push(countryCodes[k].alpha2);
      }
    }
  }

  for (var l = 0; l < codes.length; l++){
    result.push(codes[l])
  }
  console.log(codes)
  return codes
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



module.exports = router;
