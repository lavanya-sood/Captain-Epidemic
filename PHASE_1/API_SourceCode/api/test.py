import pytest
import re
import sqlite3

authentication_code = "1810051939"
# command in terminal : py.test test.py

def test_get_req_invalid_date():
    # Test invalid date
    output = get("20190909T07:09:09","20190909T07:09:09")
    expected = {
        'message' : 'Invalid date input',
        'status' : 400
    },400
    assert expected == output

def test_get_req_invalid_date_2():
    output = get("2019-09-09T07:09:09","20190909T07:09:09")
    expected = {
        'message' : 'Invalid date input',
        'status' : 400
    },400
    assert expected == output

def test_get_req_invalid_date_3():
    output = get("20190909T07:09:09","2019-09-09T07:09:09")
    expected = {
        'message' : 'Invalid date input',
        'status' : 400
    },400
    assert expected == output

def test_get_req_invalid_date_4():
    output = get("20190909T07:09:09","2019-09-09T07:09:09")
    expected = {
        'message' : 'Invalid date input',
        'status' : 400
    },400
    assert expected == output

def test_get_req_invalid_date_5():
    output = get("2019090907:09:09","2019-09-0907:09:09")
    expected = {
        'message' : 'Invalid date input',
        'status' : 400
    },400
    assert expected == output

def test_get_req_correct_date():
    # correct date input
    output = get("2019-09-09T07:09:09","2019-09-09T07:09:09")
    expected = {
        'result' : "result",
        'status' : 200
    },200
    assert expected == output

def test_get_req_article():
    # empty data found
    output = get("2019-09-09T07:09:09","2019-09-09T07:09:09",False)
    expected = {
        'message' : 'No data found',
        'status' : 404
    },404
    assert expected == output

def test_post_req_invalid_authkey():
    # test for incorrect authentication id
    output = post('18100')
    expected = {
        'message' : 'Invalid authentication id',
        'status' : 401
    },401
    assert expected == output

def test_post_req_missing_url():
    # test if required fields are inputted
    output = post('1810051939')
    expected =  {
        'message' : 'Missing required url field & date of publication in body',
        'status' : 400
    },400
    assert expected == output

def test_post_req_publication_date():
    output = post('1810051939','url')
    expected =  {
        'message' : 'Missing required url field & date of publication in body',
        'status' : 400
    },400
    assert expected == output

def test_post_req_correct_input():
    # test article added when url and date of publcation is given
    output = post('1810051939','newurl','20190909')
    expected =  {
        'message': 'Article successfully added ',
        'code' : 200
    },200
    assert expected == output


def test_put_correct_date():
    output = put('1810051939','newurl','2020-01-01T00:00:00')
    expected =  {
        'message' : 'Url Successfully added',
        'status' : 200
    },200
    # print(output)
    assert expected == output

def test_put_correct_date1():
    output = put('1810051939','newurl','2020-01-01T00:00:00 to 2020-02-01T00:00:00')
    expected =  {
        'message' : 'Url Successfully added',
        'status' : 200
    },200
    # print(output)
    assert expected == output

def test_put_wrong_id():
    output = put('1111','newurl','2020-01-01T00:00:00')
    expected =  {
            'message' : "Incorrect Authorization Key",
            'status' : 401
    },401
    # print(output)
    assert expected == output

def test_put_wrong_date_format():
    output = put('1810051939','newurl','2020-01-01 00:00:00')
    expected =  {
            'message' : "Invalid date input. Example input: '2020-01-01T00:00:00' or '2020-01-01T00:00:00 to 2020-02-01T00:00:00'",
            'status' : 400
    },400
    # print(output)
    assert expected == output


def test_put_wrong_date_format1():
    output = put('1810051939','newurl','2020-01-01')
    expected =  {
            'message' : "Invalid date input. Example input: '2020-01-01T00:00:00' or '2020-01-01T00:00:00 to 2020-02-01T00:00:00'",
            'status' : 400
    },400
    # print(output)
    assert expected == output

def test_put_wrong_date_format2():
    output = put('1810051939','newurl','2020-01-01 00:00:00 to 2020-01-01 00:00:00')
    expected =  {
            'message' : "Invalid date input. Example input: '2020-01-01T00:00:00' or '2020-01-01T00:00:00 to 2020-02-01T00:00:00'",
            'status' : 400
    },400
    # print(output)
    assert expected == output


def test_put_empty_url():
    output = put('1810051939','','2020-01-01T00:00:00')
    expected = {
            'message' : "Url can't be empty",
            'status' : 400
        },400
    # print(output)
    assert expected == output

def test_put_url_not_exist():
    output = put('1810051939','notexisturl','2020-01-01T00:00:00')
    expected = {
            'message' : "Url does not exist",
            'status' : 403
        },403
    # print(output)
    assert expected == output









def get(start_date,end_date,articles=True):
    # check start and end date format
    if not re.match(r"^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$", start_date):
        return {
            'message' : 'Invalid date input',
            'status' : 400
        },400
    if not re.match(r"^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$", end_date):
        return {
            'message' : 'Invalid date input',
            'status' : 400
        },400
    final_start,final_end = convert_date_to_int(start_date,end_date)
    if final_end < final_start:
        return {
            'message' : 'End date must be larger than start date',
            'status' : 400
        },400
    if articles == False:
        return {
            'message' : 'No data found',
            'status' : 404
        },404
    result = "result"
    return {
        'result' : result,
        'status' : 200
    },200

def post(id,url=None,date_of_publication=None,headline=None,main_text=None):
    # return 401 if authorization code is wrong
    if id != '1810051939':
        return {
            'message' : 'Invalid authentication id',
            'status' : 401
        },401
    # return 400 if url is empty
    if url is None or date_of_publication is None:
        return {
            'message' : 'Missing required url field & date of publication in body',
            'status' : 400
        },400
    conn = sqlite3.connect('who.db')
    with conn:
        # insert article
        sql = ''' INSERT INTO Article(url,headline,date_of_publication,main_text) VALUES(?,?,?,?) '''
        val = (url, headline,date_of_publication,main_text);
        cur2 = conn.cursor()
        cur2.execute(sql, val)
        if cur2.lastrowid:
            cur2.close()
            return {
                'message': 'Article successfully added ',
                'code' : 200
            },200
        return {
            'message': 'Article not added ',
            'code' : 404
        },404







def put(id, url, event_date):
    args = {}
    # return 401 if authorization code is wrong
    if authentication_code != id:
        return {
            'message' : "Incorrect Authorization Key",
            'status' : 401
        },401
    # return 400 if url is empty
    if url == "":
        return {
            'message' : "Url can't be empty",
            'status' : 400
        },400

    article = check_url_exists(url)
    if article == False:
        return {
            'message' : "Url does not exist",
            'status' : 403
        },403
    if event_date and not check_match_date_range(event_date):
        return {
            'message' : "Invalid date input. Example input: '2020-01-01T00:00:00' or '2020-01-01T00:00:00 to 2020-02-01T00:00:00'",
            'status' : 400
        },400
    add_report(url, event_date, None, None, None, None, None, None, None, None)
    return {
        'message' : "Url Successfully added",
        'status' : 200
    },200

# check if the input match for the date or date range
def check_match_date_range(input):
    return re.match(r"^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$", input) or re.match(r"^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} to [0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$", input)


# put new report to article
def add_report(url, event_date, country, location, disease, syndrome, source, case, death, control):
    conn = sqlite3.connect('who.db')
    with conn:
        # insert report
        sql = ''' INSERT INTO Report (url,event_date) VALUES(?,?) '''
        val = (url, event_date);
        cur = conn.cursor()
        cur.execute(sql, val)
        # insert disease
        if disease:
            sql = ''' INSERT INTO Disease(Disease,ReportID) VALUES(?,?) '''
            val = (disease, cur.lastrowid);
            cur3 = conn.cursor()
            cur3.execute(sql, val)
        # insert Country/location
        if country or location:
            sql = ''' INSERT INTO Location(Location,Country,ReportID) VALUES(?,?,?) '''
            val = (location,country,cur.lastrowid);
            cur4 = conn.cursor()
            cur4.execute(sql, val)
        # insert syndrome
        if syndrome:
            sql = ''' INSERT INTO Syndrome(Symptom,ReportID) VALUES(?,?) '''
            val = (syndrome, cur.lastrowid);
            cur5 = conn.cursor()
            cur5.execute(sql, val)
        if case or death or control or source:
            sql = ''' INSERT INTO Description(Source,Cases,Deaths,Controls,ReportID) VALUES(?,?,?,?,?) '''
            val = (source,case,death,control, cur.lastrowid);
            cur5 = conn.cursor()
            cur5.execute(sql, val)

# check if any data exists for the url
def check_url_exists(url):
    conn = sqlite3.connect('who.db')
    cur = conn.cursor()
    query = 'SELECT url from Article WHERE url = \'' + url + '\';'
    result = cur.execute(query).fetchall()
    conn.close()
    if len(result) == 0:
        return False
    return result

def convert_date_to_int(start_date,end_date):
    start_day,start_time = start_date.split('T')
    end_day,end_time = end_date.split('T')
    sd = start_day.replace("-","")
    ed = end_day.replace("-","")
    st = start_time.replace(":","")
    et = end_time.replace(":","")
    final_start = sd + st
    final_end = ed + et
    return final_start,final_end




# if __name__== "__main__":
#     test_get_req_article()
#     test_get_req_correct_date()
#     test_get_req_invalid_date()
#     # test_post_req_correct_input()

#     test_put_correct_date()
#     test_put_url_not_exist()
#     test_put_empty_url()
#     test_put_wrong_id()
#     test_put_wrong_date_format()
#     test_put_wrong_date_format1()
#     test_put_wrong_date_format2()