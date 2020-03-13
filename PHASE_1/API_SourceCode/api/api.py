import flask
from flask import request, jsonify
import sqlite3
app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1>Teletubbies API</h1><p>This site is a TELETUBBIES prototype API.</p>"

# get by key terms disease
@app.route('/teletubbies/who-api', methods=['GET'])

# data is compulsory
def get_data():
    conn = sqlite3.connect('who.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()

    # handle more than one key term

    # handle location
    key_terms = request.args.get('key_terms', '')
    location = request.args.get('location', '')
    start_date = request.args.get('start_date', '')
    end_date = request.args.get('end_date', '')

    # handle start and end date
    # find the article then join the report then append to the json object

    # split date / time
    if start_date == "" or end_date == "":
        return "Please provide start and end date in format"
    # do regex

    start_day,start_time = start_date.split('T')
    end_day,end_time = end_date.split('T')
    sd = start_day.replace("-","")
    query = 'SELECT * from Article where PublicationDate >=' + sd + ';'
    all_results = cur.execute(query).fetchall()
    return jsonify(all_results)

    # disease is given
    # if disease != '':
    #     results = get_disease(disease,cur)
    #     if len(results) == 0:
    #         return "No Results Found"
    #     return jsonify(results)

    # location is given
    if location != '':
        results = get_location(location,cur)
        if len(results) == 0:
            return "No Results Found"
        return jsonify(results)
    # fix this?
    # else:
    #     all_diseases = cur.execute('SELECT * FROM disease;').fetchall()
    #     return jsonify(all_diseases)

def get_location(location,cur):
    query = 'SELECT * FROM Location L JOIN Report ON Report.id = L.ReportID where L.location = \'' + location.title() + '\';'
    ''' WHERE Location.Location = \'' + location + '\';'''
    all_diseases = cur.execute(query).fetchall()
    cur.close()
    return all_diseases

def get_disease(disease,cur):
    query = 'SELECT * FROM Disease INNER JOIN Report ON Report.id = Disease.ReportID;'
    all_diseases = cur.execute(query).fetchall()
    cur.close()
    return all_diseases

# helper function
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

app.run()
