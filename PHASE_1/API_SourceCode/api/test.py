import pytest
import re

# command in terminal : py.test test.py

def test_get_req_date():
    # Test invalid date
    output = get("20190909T07:09:09","20190909T07:09:09")
    expected = {
        'message' : 'Invalid date input',
        'status' : 400
    }
    assert expected == output
    output = get("2019-09-09T07:09:09","20190909T07:09:09")
    assert expected == output
    output = get("20190909T07:09:09","2019-09-09T07:09:09")
    assert expected == output
    output = get("20190909T07:09:09","2019-09-09T07:09:09")
    assert expected == output
    output = get("2019090907:09:09","2019-09-0907:09:09")
    assert expected == output
    # correct date input
    output = get("2019-09-09T07:09:09","2019-09-09T07:09:09")
    expected = {
        'result' : "result",
        'status' : 200
    }
    assert expected == output
    
def test_get_req_article():
    # empty data found
    output = get("2019-09-09T07:09:09","2019-09-09T07:09:09",False)
    expected = {
        'message' : 'No data found',
        'status' : 404
    }
    assert expected == output

def get(start_date,end_date,articles=True):
    # check start and end date format
    if not re.match(r"^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$", start_date):
        return {
            'message' : 'Invalid date input',
            'status' : 400
        }
    if not re.match(r"^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$", end_date):
        return {
            'message' : 'Invalid date input',
            'status' : 400
        }
    final_start,final_end = convert_date_to_int(start_date,end_date)
    if final_end < final_start:
        return {
            'message' : 'End date must be larger than start date',
            'status' : 400
        }
    if articles == False:
        return {
            'message' : 'No data found',
            'status' : 404
        }
    result = "result"
    return {
        'result' : result,
        'status' : 200
    }

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

if __name__== "__main__":
  test_get_req_date()
  test_get_req_article()
