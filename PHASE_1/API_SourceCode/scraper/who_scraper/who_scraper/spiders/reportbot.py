# -*- coding: utf-8 -*-
import scrapy
import re
import json
from collections import Counter


class ReportbotSpider(scrapy.Spider):
    name = 'reportbot'
    start_urls = ['https://www.who.int/csr/don/2010_10_25a/en/','https://www.who.int/csr/don/2014_01_09_h5n1/en/','https://www.who.int/csr/don/2014_07_17_polio/en/','https://www.who.int/csr/don/2014_08_06_ebola/en/','https://www.who.int/csr/don/2014_07_17_ebola/en/','https://www.who.int/csr/don/05-March-2020-ebola-drc/en/','https://www.who.int/csr/don/1996_11_28c/en/','https://www.who.int/csr/don/2014_6_23polio/en/','https://www.who.int/csr/don/2014_01_09_h5n1/en/','https://www.who.int/csr/don/04-march-2020-measles-car/en/', 'https://www.who.int/csr/don/2008_12_26a/en/', 'https://www.who.int/csr/don/2013_11_26polio/en/', 'https://www.who.int/csr/don/28-september-2015-cholera/en/', 'https://www.who.int/csr/don/05-october-2018-monkeypox-nigeria/en/', 'https://www.who.int/csr/don/2010_04_30a/en/', 'https://www.who.int/csr/don/2008_01_02/en/', 'https://www.who.int/csr/don/2006_08_21/en/', 'https://www.who.int/csr/don/2003_09_30/en/', 'https://www.who.int/csr/don/2001_07_18/en/', 'https://www.who.int/csr/don/1999_12_22/en/', 'https://www.who.int/csr/don/1996_02_29b/en/', 'https://www.who.int/csr/don/19-december-2016-1-mers-saudi-arabia/en/', 'https://www.who.int/csr/don/06-october-2016-polio-nigeria/en/', 'https://www.who.int/csr/don/12-january-2020-novel-coronavirus-china/en/']

    def parse(self, response):
        headline = response.css(".headline::text").extract()[0]
        
        publication_date = response.xpath('//meta[@name="DC.date.published"]/@content')[0].extract()
        #convert yyyy_mm_dd and dd_month_yyyy for database
        
        maintext = response.css('div#primary').extract()[0].split('<h3 class="section_head1"')[0].split('<!-- close of the meta div -->')
        if len(maintext) == 1: 
            maintext = maintext[0]
            section_check = re.search('<h5 class="section_head3">', maintext)
            if (section_check):
                maintext = maintext.split('<h5 class="section_head3">')[0]
            if (len(response.css('.dateline').extract()) > 0):
                maintext = re.sub('^ ', '', re.sub(' +', ' ', re.sub(r'<[^>]*?>', '', '\n'.join(''.join(maintext.replace('\n', ' ').replace('<span>','\n').split('</span>')[0:]).replace('\t','').split('\n')[1:]))))
            else: 
                maintext = re.sub('^ ', '', re.sub(' +', ' ', re.sub(r'<[^>]*?>', '', '\n'.join(''.join(maintext.replace('\n', ' ').replace('<span>','\n').split('</span>')[1:]).replace('\t','').split('\n')[1:]))))
        else:
            maintext = maintext[1]
            section_check = re.search('<h5 class="section_head3">', maintext)
            if (section_check):
                maintext = maintext.split('<h5 class="section_head3">')[0]
            maintext = re.sub(r'<[^>]*?>', '', "\n".join(maintext.split('<span>')[1:])).replace('\n\t\t\n  \t\t\n  \t\t\n', '\n').rstrip()
            if maintext is '': 
                maintext = response.css('div#primary').extract()[0].split('<h3 class="section_head1"')[1]
                maintext = re.sub(r'<[^>]*?>', '', "\n".join(maintext.split('<span>')[1:])).replace('\n\t\t\n  \t\t\n  \t\t\n', '\n').rstrip()
        
        #should \n and \r be removed from output?? should it be one block of text?
        #ask about this link https://www.who.int/csr/don/1996_11_28c/en/ 
        #figure out link https://www.who.int/csr/don/2010_10_25a/en/

        # only the diseases mentioned in the title
        disease_temp = response.css(".headline::text").extract()[0]
        disease_temp = re.sub(' [^0-9A-Za-z] | in |,', '!', disease_temp)
        disease = disease_temp.split('!')[0]
        if (re.search("^[0-9 ]+$", disease)):
            disease = disease_temp.split('!')[1]
        if (re.search(" and ",disease)):
            if (re.search("hand",disease) and re.search("foot",disease) and re.search("mouth",disease)):
                disease = re.sub("foot and",'foot !', disease)
            disease = disease.split(" and ")
            for d in disease:
                d = re.sub('!', 'and', d)
        else:
            disease = [disease]
        
        # WHO already separated reports per article mostly 
        # date: go through the first paragraph for the event dates
        paragraph = maintext.split('\n')
        event_dates = event_date_helper(paragraph[0])
        i = 1
        while (len(event_dates) == 0 and i < len(paragraph)):
            event_dates = event_date_helper(paragraph[i])
            i += 1
        
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
        new_event_dates = []
        temp_event_dates = []
        for e in event_dates:
            if (re.search('and ',e,re.IGNORECASE)):
                date_2 = e.split('and ')[1]
                date_1 = e.split('and ')[0] + ' '.join(date_2.split(' ')[1:])
                temp_event_dates.append(date_1)
                temp_event_dates.append(date_2)
            else:
                temp_event_dates.append(e)
        for e in temp_event_dates:
            day = 'XX'
            month = 'XX'
            year = 'XXXX'
            dates_expanded = e.split(' ')
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
                    month = re.search('January|February|March|April|May|June|July|August|September|October|November|December',d,re.IGNORECASE)
                    if (month):
                        month = month.group()
                        for m in months:
                            mon = list(m.keys())[0]
                            if (re.search(month, mon, re.IGNORECASE)):
                                month = m[mon]
            if (year is 'XXXX'):
                temp_year = re.search('[0-9]{4}',headline)
                if (temp_year):
                    year = temp_year.group()
            date = day+'-'+month+'-'+year
            new_event_dates.append(date)

        # link diseases to the disease list given and then check for more diseases in the main text
            # if found that means there's more reports and need to scan the paragraph it was found in for more report details 
        new_diseases = get_disease_name(disease,maintext)
        
        # find symptoms: scan whole main text if no other diseases exist, or read all paragraphs up to the other diseases paragraph 
        # find sources: scan whole main text if no other diseases exist, or read all paragraphs up to the other diseases paragraph

        # TOO COMPLICATED 
        # find by cases to find different reports and sort them properly 
        # but it's hard and idk if it'll work

        # potential method
        # list of reports [
        #   {
        #       paragraph: int
        #       line: ''
        #       disease: []
        #       symptom: []
        #       event-date: []
        #       source: ''
        #   }
        # ] 

        # go through each paragraph and keep a count 
        # check per sentence for 'case' (repeats don't matter)
            # check whether it says no, none, 0, zero before the 'case' was found and remove these lines
            # if there's no number of cases mentioned in the sentence, remove the line
            # store what paragraph count it has come from in a list
            # store the paragraph and line into a list of dict
        # look at lines found of cases and get data commonly found in the same line e.g. date, disease, symptoms
        # figure out same reports and combine them or different reports and divide them
        # remove dud/useless data found
        # add missing parts by going through paragraph before the line with cases and checking for date, disease, location
        # if no disease or location can be found still, add in disease and location found in

       
        #report_list = []
        #matches = 'one|two|three|four|five|six|seven|eight|nine|ten|twenty|eleven|twelve|thirt|fift|ninth|increas|decreas|laboratory[- ]confirm|new|upsurge|rise|latest|first|second|third|hundred|thousand'
        
        #paragraphs = response.css('div#primary p span::text').extract()
        #paragraph_counter = 0
        #for p in paragraphs:
        #    for s in p.split('.'):
        #        cases = re.search('(\n)?case(s)? ',s, re.IGNORECASE)
        #        index = 0
        #        while (cases):
        #            case = cases.group()
        #            start_index = index
        #            index = s.find(case)
        #            bef_s = s[start_index:index]
        #            no_cases = re.search(' (no|none|0|zero) ',bef_s, re.IGNORECASE)
        #            if (not no_cases):
        #                num_cases = re.search('[0-9]+', bef_s)
        #                # having these made too many matches
        #                #diseases_check = re.search(diseases, s, re.IGNORECASE)
        #                #symptoms_check = re.search(symptoms, s, re.IGNORECASE)
        #                matches_check = re.search(matches, bef_s, re.IGNORECASE)
        #                if (num_cases or matches_check):
        #                    report_dict = {
        #                        'paragraph': paragraph_counter,
        #                        'line': s
        #                    }
        #                    report_list.append(report_dict)
        #                    break
        #            s = s.replace(case, '')
        #            cases = re.search(' case(s)? ',s, re.IGNORECASE)
        #    paragraph_counter+=1

        #for r in report_list: 
        #    r['event-date'] = event_date_helper(r['line'])
        #    r['diseases'] = diseases_helper(r['line'])
        #    r['syndromes'] = syndrome_helper(r['line'])
        
        # find by cases to find different reports and sort them properly 
        # but it's hard and idk if it'll work

        # potential method
        # list of reports [
        #   {
        #       paragraph: int
        #       line: ''
        #       disease: []
        #       symptom: []
        #       event-date: []
        #       source: ''
        #   }
        # ] 

        # go through each paragraph and keep a count 
        # check per sentence for 'case' (repeats don't matter)
            # check whether it says no, none, 0, zero before the 'case' was found and remove these lines
            # if there's no number of cases mentioned in the sentence, remove the line
            # store what paragraph count it has come from in a list
            # store the paragraph and line into a list of dict
        # look at lines found of cases and get data commonly found in the same line e.g. date, disease, symptoms
        # figure out same reports and combine them or different reports and divide them
        # remove dud/useless data found
        # add missing parts by going through paragraph before the line with cases and checking for date, disease, location
        # if no disease or location can be found still, add in disease and location found in

        #print(report_list)
        

        scraped_info = {
            'url': response.url,
            'headline': headline,
            'publication-date': publication_date,
            'maintext': maintext,
            'disease': disease,
            'proper-disease': new_diseases,
            'event-date': event_dates,
            'new_event_date': new_event_dates
        }

        #report_list.append(scraped_info)
        #with open ('report_output', 'a') as f:
        #    json.dump(report_list, f)
        #    f.write('\n')
        
        yield scraped_info

        
    
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
