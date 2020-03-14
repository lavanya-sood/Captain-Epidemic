#how this works: given a body of text (string) it can find all the countries in that given section
#locations is the list returned with location objects (just add to scraped_info)
#right now runs with python3 locationbot.py 
import pycountry
#from Location import * this doesnt work with scrapy? 
from geotext import GeoText

import unicodedata

class Location:
  def __init__(self, country, location):
    self.country = country
    self.location = location
    
def remove_accents(input_str):
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    return u"".join([c for c in nfkd_form if not unicodedata.combining(c)])

locations = []
text = "On 15 January 2020, the Ministry of Health, Labour and Welfare, Japan (MHLW) reported an imported case of laboratory-confirmed 2019-novel coronavirus (2019-CoV) from Wuhan, Hubei Province, China. The case-patient is male, between the age of 30-39 years, living in Japan. The case-patient travelled to Wuhan, China in late December anddeveloped fever on 3 January 2020 while staying in Wuhan. He did not visit the HuananSeafood Wholesale Market or any other live animal markets in Wuhan. Hehas indicated thathe was in close contact with a person with pneumonia. On 6 January, he traveled back toapan and tested negative for influenza when he visited a local clinic on the same day"
found_state = "no"
for country in pycountry.countries:
    if country.name in text: #found a country
        #print(country)
        #get ISO code and find all states/cities in country
        #pycountry's subdivision isn't specific enough
        subdiv = GeoText(text, country.alpha_2).cities
        #for every city mentioned save {"country": "location"}
        #if sub1 is empty save location as empty string
        # TO DO: IDK SOMEHOW GET STATES AND PROVINCE MENTIONS TOO even if it matches slightly? need a way to string match
        for cities in subdiv:
            location = Location(country.name, cities)
        foundState = "no"
        for sub in pycountry.subdivisions.get(country_code = country.alpha_2):
            if remove_accents(sub.name) in text or sub.name in text:
                location = Location(country.name, sub.name)
                found_state = "yes"
        #if there's no more specific info given
        if not subdiv and found_state == "no":
            location = Location(country.name, "")
        locations.append(location)

#testing
for l in locations:
    print(l.country)
    print(l.location)


#geograpy isn't getting everything (only one word too)

##otherwise pycountry or geotext
#pycountry: if country name is in text: save country code, find cities/subdivisions in text associated with country code

#geotext: grab country mentions: has country code: find all cities with country code, match country code to country name
