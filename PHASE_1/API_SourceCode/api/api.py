from flask import Flask,jsonify
from flask_restful import Api, Resource, reqparse
import sqlite3
import datetime

app = Flask(__name__)
api = Api(app)

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class Report(Resource):
    def get(self, start_date,end_date,location='',key_terms=''):
        return self.check_data(start_date,end_date,location,key_terms)

        if start_date == "" or end_date == "":
            return "Please provide start and end date in correct format",404
        elif location == "" and key_terms == "":
            result = self.get_data(start_date,end_date)
        # key terms and location are provided
        elif location != "" and key_terms != "":
            result = self.get_date_location_key_terms(start_date,end_date,location,key_terms)
        # location is provided
        elif location != "":
            result = self.get_data(start_date,end_date,location)
            return result
        #  key_terms is provided
        elif key_terms != "":
            result = self.get_data(start_date,end_date,'',key_terms)
            return result
        else:
            result = "Error",404

        return result

    def get_data_key_terms(self,start_date,end_date,key_terms):
        conn = sqlite3.connect('who.db')
        conn.row_factory = dict_factory
        cur = conn.cursor()
        query= self.get_article(cur,start_date,end_date) + ' and d.disease=\'' + key_terms.title() + '\';'
        all_results = cur.execute(query).fetchall()
        if not all_results:
            return 'No data found for key terms',404
        return all_results,200

    def get_date_location_key_terms(self,start_date,end_date,location,key_terms):
        conn = sqlite3.connect('who.db')
        conn.row_factory = dict_factory
        cur = conn.cursor()
        # logic for key_terms can be better
        # handle more than one key term
        query= self.get_article(start_date,end_date) + ' and l.location=\'' + location.title() + '\' and d.disease=\'' + key_terms + '\';'
        all_results = cur.execute(query).fetchall()
        if not all_results:
            return 'No data found for location and key terms',404
        return all_results,200

    def get_date_location(self,start_date,end_date,location):
        conn = sqlite3.connect('who.db')
        conn.row_factory = dict_factory
        cur = conn.cursor()
        query= self.get_article(start_date,end_date) + ' and l.location=\'' + location.title() + '\';'
        all_results = cur.execute(query).fetchall()
        if not all_results:
            return 'No data found for location',404
        return all_results,200

    # check if got matching location and key_terms
    # return report id
    def check_data(self,start_date,end_date,location,key_terms):
        final_start,final_end = self.convert_date_to_int(start_date,end_date)
        if final_end < final_start:
            return 'Wrong date'
        conn = sqlite3.connect('who.db')
        conn.row_factory = dict_factory
        cur = conn.cursor()
        query = 'SELECT r.id,a.headline,a.main_text,a.date_of_publication,a.url,l.location,r.event_date from Article a JOIN Report r on r.url = a.url where a.date_of_publication >=' + final_start + ' and a.date_of_publication <=' + final_end + ';'
        if location == '':
            query = 'SELECT r.id,a.headline,a.main_text,a.date_of_publication,a.url,l.location,r.event_date from Article a JOIN Report r on r.url = a.url JOIN Location l on l.ReportID = r.id where a.date_of_publication >=' + final_start + ' and a.date_of_publication <=' + final_end + ' and l.location = \'' + location + '\';'
        if key_terms != '':
            query = 'SELECT r.id,a.headline,a.main_text,a.date_of_publication,a.url,l.location,r.event_date from Article a JOIN Report r on r.url = a.url JOIN Location l on l.ReportID = r.id LEFT JOIN Disease d on d.ReportID = r.id where a.date_of_publication >=' + final_start + ' and a.date_of_publication <=' + final_end + ' and d.Disease = \'' + key_terms + '\';'
        reports = cur.execute(query).fetchall()
        return reports

    def get_data(self,start_date,end_date,location='',key_terms=''):
        conn = sqlite3.connect('who.db')
        conn.row_factory = dict_factory
        cur = conn.cursor()
        articles = self.get_article(cur,start_date,end_date)
        # return 404 if no matching article
        if not articles:
            return 'No data found for date',404
        if articles == 'Wrong date':
            return 'Ensure end date is larger than start date',404
        # find reports in the articles
        for a in articles:
            date = str(a['date_of_publication'])
            # convert to desired date time format
            a['date_of_publication'] = date[:4] + '-' + date[4:6] + '-' + date[6:8] + ' ' + date[8:10] + ':' + date[10:12] +  ':' + date[12:14]
            query = 'SELECT r.url,r.id,r.event_date from Report r where r.url =\'' + a['url'] + '\';'
            reports = cur.execute(query).fetchall()
            a['reports'] = []
            # assign report fields
            for i in reports:
                b = {}
                # assign event date
                b['event_date'] = i['event_date']
                # assign Location
                if location == '':
                    query = 'SELECT Country,Location from Location where ReportID =\'' + str(i['id']) + '\';'
                else:
                    query = 'SELECT Country,Location from Location where ReportID = '+ str(i['id']) + ' and Location=\'' + location.title() + '\';'
                list_locations = cur.execute(query).fetchall()
                return list_locations
                if location != '' and not list_locations:
                    return 'No matching data found for that location',404
                b['locations'] = []
                for l in list_locations:
                    places = {}
                    places['country'] = l['Country']
                    places['location'] = l['Location']
                    b['locations'].append(places)
                # assign diseases
                # key terms logic might need to change
                if key_terms == '':
                    query = 'SELECT Disease from Disease where ReportID =\'' + str(i['id']) + '\';'
                else:
                    #query = 'SELECT Disease from Disease where ReportID =\'' + str(i['id']) + '\'and Disease =\'' + key_terms.lower() + '\';'
                    query = 'SELECT Disease from Disease where Disease =\'' + key_terms.lower() + '\' and ReportID =\'' + str(i['id']) + '\';'
                list_diseases = cur.execute(query).fetchall()
                #return len(list_diseases)
                if len(list_diseases) == 0:
                    return 'No matching data for key_terms found',404
                b['diseases'] = []
                for d in list_diseases:
                    b['diseases'].append(d['Disease'])
                # assign syndromes
                query = 'SELECT Symptom from Syndrome where ReportID =\'' + str(i['id']) + '\';'
                syndromes = cur.execute(query).fetchall()
                b['syndromes'] = []
                for s in syndromes:
                    b['syndromes'].append(s['Symptom'])
                a['reports'].append(b)

        return articles,200

    def get_article(self,cur,start_date,end_date):
        # chg dates into only integers
        final_start,final_end = self.convert_date_to_int(start_date,end_date)
        if final_end < final_start:
            return 'Wrong date'
        query = 'SELECT a.url,a.date_of_publication,a.headline,a.main_text from Article a where a.date_of_publication >=' + final_start + ' and a.date_of_publication <=' + final_end + ';'
        articles = cur.execute(query).fetchall()
        return articles

    def convert_date_to_int(self,start_date,end_date):
        start_day,start_time = start_date.split('T')
        end_day,end_time = end_date.split('T')
        sd = start_day.replace("-","")
        ed = end_day.replace("-","")
        st = start_time.replace(":","")
        et = end_time.replace(":","")
        final_start = sd + st
        final_end = ed + et
        return final_start,final_end

api.add_resource(Report, "/article/start_date=<string:start_date>&end_date=<string:end_date>","/article/start_date=<string:start_date>&end_date=<string:end_date>&location=<string:location>","/article/start_date=<string:start_date>&end_date=<string:end_date>&key_terms=<string:key_terms>","/article/start_date=<string:start_date>&end_date=<string:end_date>&key_terms=<string:key_terms>&location=<string:location>","/article/start_date=<string:start_date>&end_date=<string:end_date>&location=<string:location>&key_terms=<string:key_terms>")

app.run(debug=True)
