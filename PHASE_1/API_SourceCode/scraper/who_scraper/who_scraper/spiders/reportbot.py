# -*- coding: utf-8 -*-
import scrapy
import re
import json
from collections import Counter
from text2digits import text2digits #need to pip install

class ReportbotSpider(scrapy.Spider):
    name = 'reportbot'
    start_urls = ['https://www.who.int/csr/don/2010_10_25a/en/','https://www.who.int/csr/don/2014_01_09_h5n1/en/','https://www.who.int/csr/don/2014_07_17_polio/en/','https://www.who.int/csr/don/2014_08_06_ebola/en/','https://www.who.int/csr/don/2014_07_17_ebola/en/','https://www.who.int/csr/don/05-March-2020-ebola-drc/en/','https://www.who.int/csr/don/1996_11_28c/en/','https://www.who.int/csr/don/2014_6_23polio/en/','https://www.who.int/csr/don/2014_01_09_h5n1/en/','https://www.who.int/csr/don/04-march-2020-measles-car/en/', 'https://www.who.int/csr/don/2008_12_26a/en/', 'https://www.who.int/csr/don/2013_11_26polio/en/', 'https://www.who.int/csr/don/28-september-2015-cholera/en/', 'https://www.who.int/csr/don/05-october-2018-monkeypox-nigeria/en/', 'https://www.who.int/csr/don/2010_04_30a/en/', 'https://www.who.int/csr/don/2008_01_02/en/', 'https://www.who.int/csr/don/2006_08_21/en/', 'https://www.who.int/csr/don/2003_09_30/en/', 'https://www.who.int/csr/don/2001_07_18/en/', 'https://www.who.int/csr/don/1999_12_22/en/', 'https://www.who.int/csr/don/1996_02_29b/en/', 'https://www.who.int/csr/don/19-december-2016-1-mers-saudi-arabia/en/', 'https://www.who.int/csr/don/06-october-2016-polio-nigeria/en/', 'https://www.who.int/csr/don/12-january-2020-novel-coronavirus-china/en/','https://www.who.int/csr/don/03-june-2016-oropouche-peru/en/']

    def parse(self, response):
        headline = response.css(".headline::text").extract()[0]
        
        publication_date = response.xpath('//meta[@name="DC.date.published"]/@content')[0].extract()
        #convert yyyy_mm_dd and dd_month_yyyy for database
  
        key_terms = [] #list of strings
        #separate related_terms, get rid of [...]
        related_terms = response.xpath('//meta[@name="DC.keywords"]/@content')[0].extract()
        related_terms = re.sub('\[.*?\]', '', related_terms)
        key_terms = related_terms.split(',')
        for i, term in enumerate(key_terms):
            key_terms[i] = term.strip()
            
        maintext = response.css('div#primary').extract()[0].split('<h3 class="section_head1"')[0].split('<!-- close of the meta div -->')
        alltext = response.css('div#primary').extract()[0]
        key_terms = key_terms_helper(alltext.lower(), key_terms)

        #convert all numbers written in words into numbers
        #join numbers like 18 038 to 18038
        alltext = re.sub('(?<=\d) (?=\d)', '', alltext)
        alltext = re.sub('(?<=\d),(?=\d)', '', alltext)
        cases = find_cases(response, text2digits.Text2Digits().convert(alltext))
        deaths = find_deaths(response,text2digits.Text2Digits().convert(alltext))
        controls = find_phs_controls(response)

        if len(maintext) == 1: 
            maintext = maintext[0]
            section_check = re.search('<h5 class="section_head3">', maintext)
            if (section_check):
                maintext = maintext.split('<h5 class="section_head3">')[0]
            section_check = re.search('<ul class="list">', maintext)
            if (section_check):
                maintext = maintext.split('<ul class="list">')[0]
            if (len(response.css('.dateline').extract()) > 0):
                maintext = re.sub('^ ', '', re.sub(' +', ' ', re.sub(r'<[^>]*?>', '', '\n'.join(''.join(maintext.replace('\n', ' ').replace('<span>','\n').split('</span>')[0:]).replace('\t','').split('\n')[1:]))))
            else: 
                maintext = re.sub('^ ', '', re.sub(' +', ' ', re.sub(r'<[^>]*?>', '', '\n'.join(''.join(maintext.replace('\n', ' ').replace('<span>','\n').split('</span>')[1:]).replace('\t','').split('\n')[1:]))))
        else:
            maintext = maintext[1]
            section_check = re.search('<h5 class="section_head3">', maintext)
            if (section_check):
                maintext = maintext.split('<h5 class="section_head3">')[0]
            section_check = re.search('<ul class="list">', maintext)
            if (section_check):
                maintext = maintext.split('<ul class="list">')[0]
            maintext = re.sub(r'<[^>]*?>', '', "\n".join(maintext.split('<span>')[1:])).replace('\n\t\t\n  \t\t\n  \t\t\n', '\n').rstrip()
            if maintext is '': 
                maintext = response.css('div#primary').extract()[0].split('<h3 class="section_head1"')[1]
                maintext = re.sub(r'<[^>]*?>', '', "\n".join(maintext.split('<span>')[1:])).replace('\n\t\t\n  \t\t\n  \t\t\n', '\n').rstrip()
        
        #should \n and \r be removed from output?? should it be one block of text?

        
        # WHO already separated reports per article mostly 
        # creates reports based on diseases found in title and separates them if more than one is found
        
        # finds event dates
        paragraph = maintext.split('\n')
        event_dates = event_date_helper(paragraph[0])
        i = 1
        while (len(event_dates) == 0 and i < len(paragraph)):
            event_dates = event_date_helper(paragraph[i])
            i += 1
        # puts event dates into proper format
        event_date = event_date_range(event_dates,response,headline)
        
        # finds diseases mentioned in the title
        disease_temp = response.css(".headline::text").extract()[0]
        disease_temp = re.sub(' [^0-9A-Za-z] | in |,', '!', disease_temp)
        report_disease = disease_temp.split('!')[0]
        if (re.search("^[0-9 ]+$", report_disease)):
            report_disease = disease_temp.split('!')[1]
        if (re.search(" and ",report_disease)):
            if (re.search("hand",report_disease) and re.search("foot",report_disease) and re.search("mouth",report_disease)):
                report_disease = re.sub("foot and",'foot !', report_disease)
            report_disease = report_disease.split(" and ")
            for d in report_disease:
                d = re.sub('!', 'and', d)
        else:
            report_disease = [report_disease]
        # gets proper disease names 
        diseases = get_disease_name(report_disease,maintext)

        # adds basic news reports to list
        reports = []
        for d in diseases:
            r_dict = {
                'event-date': event_date,
                'disease': d
            }
            reports.append(r_dict)

        # finds extra disease reports in the maintext
        extra_report_diseases = find_more_diseases(maintext, diseases)
        # gets proper disease names
        extra_diseases = get_disease_name(extra_report_diseases, maintext)
        
        # gets dates related to the extra diseases by using the paragraph it was found in
        dates = []
        p_found = -1
        for d in extra_report_diseases:
            i = 0
            for p in paragraph:
                if (re.search(d, p, re.IGNORECASE)):
                    date = event_date_helper(paragraph[i])
                    # puts dates into proper formats
                    date = event_date_range(date,response,headline)
                    dates.append(date)
                    break
                i += 1

        # makes new disease reports for extra diseases found and adds to list
        for d, e in zip(extra_diseases, dates):
            r_dict = {
                'event-date': e,
                'disease': d
            }
            reports.append(r_dict)
            
        print(reports)

        scraped_info = {
            'url': response.url,
            'headline': headline,
            'publication-date': publication_date,
            'maintext': maintext,
            'key_terms': key_terms,
            'cases': cases,
            'deaths': deaths
        }

        #report_list.append(scraped_info)
        #with open ('report_output', 'a') as f:
        #    json.dump(report_list, f)
        #    f.write('\n')
        
        yield scraped_info

disease_dict = [
    { "name": "anthrax cutaneous" },
    { "name": "anthrax gastrointestinous" },
    { "name": "anthrax inhalation" },
    { "name": "botulism" },
    { "name": "brucellosis" },
    { "name": "chikungunya" },
    { "name": "cholera" },
    { "name": "cryptococcosis" },
    { "name": "cryptosporidiosis" },
    { "name": "crimean-congo haemorrhagic fever" },
    { "name": "dengue" },
    { "name": "diphteria" },
    { "name": "ebola haemorrhagic fever" },
    { "name": "ehec (e.coli)" },
    { "name": "enterovirus 71 infection" },
    { "name": "influenza a/h5n1" },
    { "name": "influenza a/h7n9" },
    { "name": "influenza a/h9n2" },
    { "name": "influenza a/h1n1" },
    { "name": "influenza a/h1n2" },
    { "name": "influenza a/h3n5" },
    { "name": "influenza a/h3n2" },
    { "name": "influenza a/h2n2" },
    { "name": "hand, foot and mouth disease" },
    { "name": "hantavirus" },
    { "name": "hepatitis a" },
    { "name": "hepatitis b" },
    { "name": "hepatitis c" },
    { "name": "hepatitis d" },
    { "name": "hepatitis e" },
    { "name": "histoplasmosis" },
    { "name": "hiv/aids" },
    { "name": "lassa fever" },
    { "name": "malaria" },
    { "name": "marburg virus disease" },
    { "name": "measles" },
    { "name": "mers-cov" },
    { "name": "mumps" },
    { "name": "nipah virus" },
    { "name": "norovirus infection" },
    { "name": "pertussis" },
    { "name": "plague" },
    { "name": "pneumococcus pneumonia" },
    { "name": "poliomyelitis" },
    { "name": "q fever" },
    { "name": "rabies" },
    { "name": "rift valley fever" },
    { "name": "rotavirus infection" },
    { "name": "rubella" },
    { "name": "salmonellosis" },
    { "name": "sars" },
    { "name": "shigellosis" },
    { "name": "smallpox" },
    { "name": "staphylococcal enterotoxin b" },
    { "name": "thypoid fever" },
    { "name": "tuberculosis" },
    { "name": "tularemia" },
    { "name": "vaccinia and cowpox" },
    { "name": "varicella" },
    { "name": "west nile virus" },
    { "name": "yellow fever" },
    { "name": "yersiniosis" },
    { "name": "zika" },
    { "name": "legionares" },
    { "name": "listeriosis" },
    { "name": "monkeypox" },
    { "name": "COVID-19" }
]    
    
def event_date_helper(text):
    event_date_list = []
    date_found = re.search(r'([0-9]{1,2}((-)|( (to|and) )))?([0-9]{1,2}((th|rd|st) of)? )?(January|February|March|April|May|June|July|August|September|October|November|December)( (and|to) (January|February|March|April|May|June|July|August|September|October|November|December))?( [0-9]{4})?', text)
    if (date_found):
        date_found = date_found.group()
        event_date_list.append(date_found)
        while(date_found is not None):
            text = text.replace(date_found, '')
            date_found = re.search(r'([0-9]{1,2}((-)|( (to|and) )))?([0-9]{1,2}((th|rd|st) of)? )?(January|February|March|April|May|June|July|August|September|October|November|December)( (and|to) (January|February|March|April|May|June|July|August|September|October|November|December))?( [0-9]{4})?', text)
            if (date_found):
                date_found = date_found.group()
                event_date_list.append(date_found)
            else:
                date_found = None
    return event_date_list

def diseases_helper(text):
    disease_list = []
    diseases = 'congo haemorrhagic fever|congo fever|ebola|dengue|diphteria|ebola haemorrhagic fever|ehec|ecoli|enterovirus 71 infection|enterovirus|influenza|influenza a/h5n1|influenza a/h7n9|influenza a/h9n2|influenza a/h1n1|influenza a/h1n2|influenza a/h3n5|influenza a/h3n2|influenza a/h2n2|influenza a(h5n1)|influenza a(h7n9)|influenza a(h9n2)|influenza a(h1n1)|influenza a(h1n2)|influenza a(h3n5)|influenza a(h3n2)|influenza a(h2n2)|hand, foot and mouth disease|hantavirus|hepatitis|hepatitis a|hepatitis b|hepatitis c|hepatitis d|hepatitis e|histoplasmosis|hiv|aids|lassa fever|lassa|malaria|marburg virus disease|marbug|measles|mers-cov|mers|mumps|nipah virus|nipah|norovirus infection|norovirus|pertussis|plague|pneumococcus pneumonia|pneumococcus|legionellosis|pneumonia|polio|q fever|rabies|rift valley fever|rift valley|rotavirus infection|rotavirus|rubella|salmonellosis|salmonella|sars|shigellosis|smallpox|staphylococcal enterotoxin b|staphylococcal|enterotoxin|thypoid fever|thypoid|tuberculosis|tularemia|vaccinia|cowpox|varicella|west nile virus|west nile|yellow fever|yersiniosis|zika|legionares|listeriosis|monkeypox|2019nCoV|coronavirus|pox|zika|legionnaire|virus|anthrax|botulism|smallpox|tularemia|junin|machupo|guanarito|chapare|lujo|cholera|meningitis'
    disease_found = re.search(diseases, text)
    if (disease_found):
        disease_found = disease_found.group()
        disease_list.append(disease_found)
        while(disease_found is not None):
            text = text.replace(disease_found, '')
            disease_found = re.search(diseases, text)
            if (disease_found):
                disease_found = disease_found.group()
                disease_list.append(disease_found)
            else:
                disease_found = None
    return disease_list

def syndrome_helper(text):
    syndrome_list = []
    symptoms = 'haemorrhagic|fever|flacid|paralysis|gastroenterities|gastro|respiratory|syndrome|influenza-like|illness|rash|encephalitis|meningitis|diarrhea|coughing|diarrhoea|diarrheal|diarrhoeal|itch|itchy|itchiness|red skin|irritated|headache|headaches|seizure|seizures|nausea|vomiting|lethargy|runny nose|muscle pain|muscle ache|muscle aches|confusion|cold hands|cold feet|mottled skin|congestion|rhinorrhea|sneezing|sore throat|scratchy throat|cough|odynophagia|painful swallowing|drowsiness|coma|comas|sores|paralytic|dehydrated|stomach cramp|cramp'
    symptom_found = re.search(symptoms, text)
    if (symptom_found):
        symptom_found = symptom_found.group()
        syndrome_list.append(symptom_found)
        while(symptom_found is not None):
            text = text.replace(symptom_found, '')
            symptom_found = re.search(symptoms, text)
            if (symptom_found):
                symptom_found = symptom_found.group()
                syndrome_list.append(symptom_found)
            else:
                symptom_found = None
    return syndrome_list

def find_influenza_type(maintext, text):
    types = ['h5n1','h7n9','h9n2','h1n1','h1n2','h3n5','h3n2','h2n2']
    for t in types:
        check = re.search(t, maintext, re.IGNORECASE)
        if (check):
            return 'influenza a/' + t

def get_disease_name(disease,maintext):
    new_diseases = []
    for f in disease:
        influenza = 0
        check = 0
        proper_diseases = []
        for d in disease_dict:
            words = f.split( )
            for w in words:
                if (re.search(w, 'fever|virus|infection|disease', re.IGNORECASE)):
                    continue
                if (re.search(w, d["name"],re.IGNORECASE)):
                    if (re.search(w,'influenza',re.IGNORECASE)):
                        influenza = 1
                    proper_diseases.append(d["name"])
                    check = 1
        if (check == 0):
            if (re.search('polio',f,re.IGNORECASE)):
                proper_diseases.append("poliomyelitis")
            if (re.search('corona',f,re.IGNORECASE)):
                proper_diseases.append('COVID-19')
            if (re.search('Legionellosis',f,re.IGNORECASE)):
                proper_diseases.append('legionares')
        if (len(proper_diseases) > 0):
            disease_count = Counter(proper_diseases)
            dis, count = disease_count.most_common(1)[0]
            if (influenza == 1 and count == 0):
                new_diseases.append(find_influenza_type(maintext, f))
            else:
                new_diseases.append(dis)
    new_diseases = list(set(new_diseases))
    if (len(disease) != 0 and len(new_diseases) == 0):
        new_diseases = ['other']
    if (len(new_diseases) == 0):
        new_diseases = ['unknown']
    return new_diseases

def key_terms_helper(text, terms_list):
    terms = 'outbreak|infection|fever|virus|epidemic|infectious|illness|bacteria|emerging|unknown virus|mystery disease|mysterious disease|zika|mers|salmonella|legionnaire|measles|category a agents|anthrax|botulism|plague|smallpox|pox|tularemia|junin fever|machupo fever|guanarito fever|chapare fever|lassa fever|lujo fever|hantavirus|rift valley fever|crimean congo hemorrhagic fever|dengue|ebola|marburg'
    terms_found = re.search(terms, text)
    if (terms_found):
        terms_found = terms_found.group()
        terms_list.append(terms_found)
        while(terms_found is not None):
            text = text.replace(terms_found, '')
            terms_found = re.search(terms, text)
            if (terms_found):
                terms_found = terms_found.group()
                terms_list.append(terms_found)
            else:
                terms_found = None
    return terms_list

def event_date_range(event_dates,response,headline):
    new_dates = []
    temp_event_dates = []
    for e in event_dates:
        if (re.search('and ',e,re.IGNORECASE)):
            date_2 = e.split('and ')[1]
            date_1 = e.split('and ')[0] + ' '.join(date_2.split(' ')[1:])
            temp_event_dates.append(date_1)
            temp_event_dates.append(date_2)
        else:
            temp_event_dates.append(e)
    new_dates = convert_dates(temp_event_dates, ' ', headline, response)
    if (len(new_dates) == 0):
        event_date = re.findall('\d{4}_\d{2}_\d{2}', response.url)
        if len(event_date) == 0:
            event_date = response.url.split('don/')[1].split('-')[:3]
            month = convert_month(event_date[1])
            event_date = event_date[2]+'-'+month+'-'+event_date[0]+' xx:xx:xx'
        else:
            event_date = re.sub(r'_','-',event_date[0])+' xx:xx:xx'
    else:
        new_dates.sort()
        first_date = new_dates[0]
        last_date = new_dates[len(new_dates)-1]
        if (first_date != last_date):
            date1 = format_date(first_date)
            date2 = format_date(last_date)
            event_date = date1 + ' to ' + date2
        else:
            event_date = format_date(first_date)
    return event_date

def format_date(date):
    date = str(date)
    year = date[:4]
    if (year == '0000'):
        year = 'xxxx'
    month = date[4:6]
    if (month == '00'):
        month = 'xx'
    day = date[6:]
    if (day == '00'):
        day = 'xx'
    return year + '-' + month + '-' + day + ' xx:xx:xx'

def convert_month(string):
    months = [
        {'January': '01'},
        {'February': '02'},
        {'March': '03'},
        {'April': '04'},
        {'May': '05'},
        {'June': '06'},
        {'July': '07'},
        {'August': '08'},
        {'September': '09'},
        {'October': '10'},
        {'November': '11'},
        {'December': '12'},
    ]
    month = re.search('January|February|March|April|May|June|July|August|September|October|November|December',string,re.IGNORECASE)
    if (month):
        month = month.group()
        for m in months:
            mon = list(m.keys())[0]
            if (re.search(month, mon, re.IGNORECASE)):
                month = m[mon]
    return month

def convert_dates(temp_event_dates, string, headline, response):
   
    new_dates = []
    for e in temp_event_dates:
        day = '00'
        month = '00'
        year = '0000'
        dates_expanded = e.split(string)
        for d in dates_expanded:
            date_int = re.search('[0-9]+',d,re.IGNORECASE)
            if (date_int):
                if (len(date_int.group()) > 2):
                    year = date_int.group()
                else:
                    day = date_int.group()
                    if (len(day) < 2):
                        day = '0'+day
            else:
                month = convert_month(d)
        if (year is '0000'):
            temp_year = re.search('[0-9]{4}',headline)
            if (temp_year):
                year = temp_year.group()
        if (year is '0000'):
            temp_year = re.search('[0-9]{4}', response.url)
            if (temp_year):
                year = temp_year.group()
        date = year + month + day
        date = int(date)
        new_dates.append(date)
    return new_dates

def find_cases(response, alltext):
    table = response.xpath('//*[@class="borderOn"]//tbody')
    if (table): #if there is a table outlining cases use this
        rows = table.xpath('//tr')
        row = rows[-3]
        case = row.xpath('td//text()')[-1].extract()
        return case
    #otherwise look through all text and find 'totals' (find confirmed here too)
    case = re.search('total (of )?[ 0-9]+| ^(\(H1N1\)) [ 0-9]+ confirmed case(s)?', alltext) #finds first one only automatically
    #H1n1 case is because some reports name it h1n1 2009 (reports sometimes say h1n1 2009 confirmed cases)
    if (case):
        case = case.group()
        case = int(''.join(filter(str.isdigit, case)))
        return case
    #otherwise look for all other ways of saying cases
    case = re.search(' ^(\(H1N1\)) [ 0-9]+( suspected| new| laboratory-confirmed| confirmed)? case(s)?| ^(\(H1N1\)) [ 0-9]+(st|rd|nd|th) case| ^(\(H1N1\)) [ 0-9]+ laboratory confirmed', alltext)
    if (case):
        case = case.group()
        case = int(''.join(filter(str.isdigit, case)))
        return case
    return case #None

def find_deaths(response, alltext):
    table = response.xpath('//*[@class="borderOn"]//tbody')
    if (table): #if there is a table outlining cases use this
        rows = table.xpath('//tr')
        row = rows[-2]
        death = row.xpath('td//text()')[-1].extract()
        return death
    #otherwise look through all text and find 'ways of saying death'
    death = re.search(' [ 0-9]+ death(s)?| [ 0-9]+ case(s)? died | [ 0-9]+ of fatal | [ 0-9]+ fatal | [ 0-9]+ (were|was) fatal | [ 0-9]+ related death(s)? | [ 0-9]+ ha(ve|s) been fatal | [ 0-9]+ of these cases have died | [ 0-9]+ ha(ve|s) died ', alltext) #finds first one only automatically
    if (death):
        death = death.group()
        death = int(''.join(filter(str.isdigit, death)))
        return death
    return death #none

# find any extra diseases mentioned = new report
def find_more_diseases(maintext, disease_list):
    diseases = []
    for d in disease_dict:
        diseases.append(list(d.values())[0])
    diseases = '|'.join(diseases)
    diseases = 'polio|coronavirus|influenza|anthrax|ebola|ehec|ecoli|enterovirus|hiv|aids|lassa|marbug|mers|mipah|norovirus|pneumonia|rotavirus|thypoid|cowpox' + diseases
    diseases = '(' + diseases + ')'
    found = re.findall(diseases,maintext,re.IGNORECASE)
    found = [tuple(j for j in i if j)[-1] for i in found]
    remove = []
    for d in disease_list:
        i = 0
        for f in found:
            if (re.search(f,d,re.IGNORECASE)):
                remove.append(i)
            else:
                if (d == 'COVID-19' and re.search('coronavirus',f,re.IGNORECASE)):
                    remove.append(i)
            i += 1
    remove.sort(reverse=True)
    for i in remove:
        del found[i]
    result = []
    for f in found:
        f = f.lower()
    found = list(set(found))
    for f in found:
        for m in maintext.split('.'):
            if (re.search(f,m,re.IGNORECASE)):
                if (re.search('case|outbreak',m,re.IGNORECASE)):
                    if (f not in result):
                        result.append(f)
    return result

def find_phs_controls(response):
    controls = []
    text = response.css('div#primary').extract()[0].split('</h3>')
    i = 0
    check = 0
    for t in text:
        if (re.search('public health response', t, re.IGNORECASE)):
            check = 1
            break
        i += 1
    if (check is 1):
        text = text[i+1]
        if (re.search('<li>',text)):
            for t in text.split('<li>')[1:]:
                if (re.search('</li>',t)):
                    if (re.search(';',t)):
                        index = t.index(';')
                    else:
                        index = t.index('<')
                    control = t[:index]
                    controls.append(control)
    text = ''.join(response.css('div#primary p span::text').extract()) 
    for t in text.split('.'):
        control = re.search("WHO is |WHO's |WHO does |WHO encourages |WHO recommends |WHO advises ",t)
        if (control):
            controls.append(t)
    return controls

                    

    
