import flask
from flask import request, jsonify,send_from_directory, make_response
import sqlite3
from flask_swagger_ui import get_swaggerui_blueprint


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
    disease = request.args.get('disease', '')
    location = request.args.get('location', '')
    start_date = request.args.get('start_date', '')
    end_date = request.args.get('end_date', '')
    # disease is given
    if disease != '':
        results = get_disease(disease,cur)
        if len(results) == 0:
            return "No Results Found"
        return jsonify(results)
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
    query = 'SELECT * FROM Location L INNER JOIN Report ON Report.id = L.ReportID where L.location = \'' + location.title() + '\';'
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


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static',path)



# SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
# #API_URL = 'http://petstore.swagger.io/v2/swagger.json'  # Our API url (can of course be a local resource)
# API_URL = '/static/swagger.json'
# # Call factory function to create our blueprint
# swaggerui_blueprint = get_swaggerui_blueprint(
#     SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
#     API_URL,
#     config={  # Swagger UI config overrides
#         'app_name': "Test application"
#     },
#     # oauth_config={  # OAuth config. See https://github.com/swagger-api/swagger-ui#oauth2-configuration .
#     #    'clientId': "your-client-id",
#     #    'clientSecret': "your-client-secret-if-required",
#     #    'realm': "your-realms",
#     #    'appName': "your-app-name",
#     #    'scopeSeparator': " ",
#     #    'additionalQueryStringParams': {'test': "hello"}
#     # }
# )

# # Register blueprint at URL
# # (URL must match the one given to factory function above)
# app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

### swagger specific ###
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Teletubbies-API"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
### end swagger specific ###


@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


app.run()
