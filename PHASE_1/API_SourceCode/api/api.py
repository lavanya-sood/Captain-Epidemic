import flask
from flask import request, jsonify,send_from_directory, make_response
import sqlite3
from flask_swagger_ui import get_swaggerui_blueprint


app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a TELETUBBIES prototype API.</p>"

@app.route('/api/v1/resources/books/all', methods=['GET'])
def api_all():
    conn = sqlite3.connect('books.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_books = cur.execute('SELECT * FROM books;').fetchall()

    return jsonify(all_books)
# user specify an id
@app.route('/api/v1/resources/books', methods=['GET'])
def api_id():
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display 404 page.
    results = []
    if 'id' in request.args:
        id = int(request.args['id'])
        to_filter = []
        query = "SELECT * FROM books WHERE id = "
        query += str(id) + ';'

        conn = sqlite3.connect('books.db')
        conn.row_factory = dict_factory
        cur = conn.cursor()
        results = cur.execute(query, to_filter).fetchall()
    else:
         return page_not_found(404)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

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


app.run()
