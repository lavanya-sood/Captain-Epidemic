import pytest
import re
import sqlite3
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

def test_delete_incorrect_id():
    # test for incorrect authentication id
    output = post('13454')
    expected = {
        'message' : 'Invalid authentication id',
        'status' : 401
    },401
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



def delete(id,url) :
    # return 401 if authorization code is wrong
    if id != '1810051939':
        return {
            'message' : 'Incorrect Authorization Key',
            'status' : 401
        },401
    conn = sqlite3.connect('who.db')
    with conn:
        #look for url in the database
        query1 = 'SELECT url from Article WHERE url = \'' + url + '\';'
        cur3 = conn.cursor()
        result = cur3.execute(query1).fetchall()
        conn.close()

        if len(result) == 0:
            return {
                'message': 'Url does not exist',
                'status' : 403
            },403




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
