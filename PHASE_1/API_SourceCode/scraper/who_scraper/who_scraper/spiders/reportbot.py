# -*- coding: utf-8 -*-
import scrapy
import re


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

        # change everything below
        # find by cases but it's hard

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
            # if there's no number or diseases or symptom in the sentence, remove the line
            # store what paragraph count it has come from in a list
            # store the paragraph and line into a list of dict

        # loop through the lines with cases and look for extra details e.g. disease, date, symptom, source
            # if found, add extra details to the dict 
        
        # extra plan to fill in missing data for reports
        # extra_info = [
        #   {
        #       paragraph: int
        #       disease: []
        #       symptom: []
        #       event-date: []
        #       extra info if we think that's needed
        #   }
        # ]
        # collect paragraphs found in the list of report dict
        # loop through the paragraphs found in the list of reports
            # check for diseases, symptoms, event-date, source and extra info and add to dict

        # go through the list of dict reports and fill in missing data by matching it the paragraph list of info 
        
        # if there is a element of the list of dict reports that's missing disease or location
        # add the diseases and locations found in the title 
        

        scraped_info = {
            'url': response.url,
            'headline': headline,
            'publication-date': publication_date,
            'maintext': maintext,
            'disease': disease,
            'eventdate': event_date_list
        }
        yield scraped_info

        
    
def event_date_helper(text):
    event_date_list = []
    date_found = re.search(r'([0-9]{1,2} (to|and) )?([0-9]{1,2} )?(January|February|March|April|May|June|July|August|September|October|November|December)( (and|to) (January|February|March|April|May|June|July|August|September|October|November|December))?( [0-9]{4})?', text)
    if (date_found):
        date_found = date_found.group()
        event_date_list.append(date_found)
        while(date_found is not None):
            text = text.replace(date_found, '')
            date_found = re.search(r'([0-9]{1,2} (to|and) )?([0-9]{1,2} )?(January|February|March|April|May|June|July|August|September|October|November|December)( (and|to) (January|February|March|April|May|June|July|August|September|October|November|December))?( [0-9]{4})?', text)
            if (date_found):
                date_found = date_found.group()
                event_date_list.append(date_found)
            else:
                date_found = None
    return event_date_list