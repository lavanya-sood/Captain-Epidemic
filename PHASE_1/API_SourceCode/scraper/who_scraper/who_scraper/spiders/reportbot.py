# -*- coding: utf-8 -*-
import scrapy
import re
import json


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
            if (len(response.css('.dateline').extract()) > 0):
                maintext = re.sub('^ ', '', re.sub(' +', ' ', re.sub(r'<[^>]*?>', '', '\n'.join(''.join(maintext.replace('\n', ' ').replace('<span>','\n').split('</span>')[0:]).replace('\t','').split('\n')[1:]))))
            else: 
                maintext = re.sub('^ ', '', re.sub(' +', ' ', re.sub(r'<[^>]*?>', '', '\n'.join(''.join(maintext.replace('\n', ' ').replace('<span>','\n').split('</span>')[1:]).replace('\t','').split('\n')[1:]))))
        else:
            maintext = maintext[1]
            maintext = re.sub(r'<[^>]*?>', '', "\n".join(maintext.split('<span>')[1:])).replace('\n\t\t\n  \t\t\n  \t\t\n', '\n').rstrip()
            if maintext is '': 
                maintext = response.css('div#primary').extract()[0].split('<h3 class="section_head1"')[1]
                maintext = re.sub(r'<[^>]*?>', '', "\n".join(maintext.split('<span>')[1:])).replace('\n\t\t\n  \t\t\n  \t\t\n', '\n').rstrip()
        #should \n and \r be removed from output?? should it be one block of text?
        #ask about this link https://www.who.int/csr/don/1996_11_28c/en/ 
        #figure out link https://www.who.int/csr/don/2010_10_25a/en/

        # only the disease mentioned in the title
        disease_temp = response.css(".headline::text").extract()[0]
        disease_temp = re.sub(' [^0-9A-Za-z] | in |,', '!', disease_temp)
        disease = disease_temp.split('!')[0]
        if (re.search("^[0-9 ]+$", disease)):
            disease = disease_temp.split('!')[1]
        if (re.search(" and ",disease)):
            disease = disease.split(" and ")
        else:
            disease = [disease]

        # overall plan to find reports by cases found
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
        # if no disease or location can be found still, add in disease and location found in headers
        
       
        

        report_list = []


        # commonly found before 'cases'
        matches = 'one|two|three|four|five|six|seven|eight|nine|ten|twenty|eleven|twelve|thirt|fift|ninth|increas|decreas|laboratory[- ]confirm|new|upsurge|rise|latest|first|second|third|hundred|thousand'
        
        paragraphs = response.css('div#primary p span::text').extract()
        paragraph_counter = 0
        for p in paragraphs:
            for s in p.split('.'):
                cases = re.search('(\n)?case(s)? ',s, re.IGNORECASE)
                index = 0
                while (cases):
                    case = cases.group()
                    start_index = index
                    index = s.find(case)
                    bef_s = s[start_index:index]
                    no_cases = re.search(' (no|none|0|zero) ',bef_s, re.IGNORECASE)
                    if (not no_cases):
                        num_cases = re.search('[0-9]+', bef_s)
                        # having these made too many matches
                        #diseases_check = re.search(diseases, s, re.IGNORECASE)
                        #symptoms_check = re.search(symptoms, s, re.IGNORECASE)
                        matches_check = re.search(matches, bef_s, re.IGNORECASE)
                        if (num_cases or matches_check):
                            report_dict = {
                                'paragraph': paragraph_counter,
                                'line': s
                            }
                            report_list.append(report_dict)
                            break
                    s = s.replace(case, '')
                    cases = re.search(' case(s)? ',s, re.IGNORECASE)
            paragraph_counter+=1

        # loop through the lines with cases and look for extra details e.g. disease, date, symptom, source
            # if found, add extra details to the dict 
        
        # look for date, disease, symptoms in sentence 
        # add whatever else is commonly found in these lines

        for r in report_list: 
            r['event-date'] = event_date_helper(r['line'])
            r['diseases'] = diseases_helper(r['line'])
            r['syndromes'] = syndrome_helper(r['line'])

        print(report_list)
        with open ('report_output', 'a') as f:
            json.dump(report_list, f)
            f.write('\n')

        # seperate different reports 
            # look at date, disease, location, if different ones are used then separate
        # combine data talking about the same thing/same report 
            # look at the paragraph it's from and the data found and see if they're similar and combine if so
        # remove duplicate/dud data if any 
            # somehow figure out what's bad data and delete
s
        # after data found is filtered (three points above), find more details
        
        # check for diseases, symptoms, event-date, source and extra info and add to dict if not already found
        # loop through the list of reports
            # look at what paragraph the line is found in 
            # to find the date if it's missing
                # look at the data before the line and search for the date
            # if more than one report are within one paragraph
                # search through the paragragh before the line was found and look for extra or missing  data
            # if there's only one report per paragraph just search the whole thing for extra or missing data
            
        # after data found is filtered, fill in missing disease and locations using those found in the titles

        scraped_info = {
            'url': response.url,
            'headline': headline,
            'publication-date': publication_date,
            'maintext': maintext,
            'disease': disease
        }
        yield scraped_info

        
    
def event_date_helper(text):
    event_date_list = []
    date_found = re.search(r'([0-9]{1,2}((-)|( (to|and) )))?([0-9]{1,2}(th|rd|st)? )?(January|February|March|April|May|June|July|August|September|October|November|December)( (and|to) (January|February|March|April|May|June|July|August|September|October|November|December))?( [0-9]{4})?', text)
    if (date_found):
        date_found = date_found.group()
        event_date_list.append(date_found)
        while(date_found is not None):
            text = text.replace(date_found, '')
            date_found = re.search(r'([0-9]{1,2}((-)|( (to|and) )))?([0-9]{1,2}(th|rd|st)? )?(January|February|March|April|May|June|July|August|September|October|November|December)( (and|to) (January|February|March|April|May|June|July|August|September|October|November|December))?( [0-9]{4})?', text)
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