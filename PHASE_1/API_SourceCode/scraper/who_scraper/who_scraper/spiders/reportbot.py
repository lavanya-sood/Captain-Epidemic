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
                maintext = re.sub('^ ', '', re.sub(' +', ' ', re.sub(r'<[^>]*?>', '', '\n'.join(''.join(maintext.replace('\n', ' ').replace('<span>','\n').split('</span>')[1:]).replace('\t','').split('\n')[0:]))))
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

        disease_temp = response.css(".headline::text").extract()[0]
        disease_temp = re.sub(' [^0-9A-Za-z] | in |,', '!', disease_temp)
        disease = disease_temp.split('!')[0]
        if (re.search("^[0-9 ]+$", disease)):
            disease = disease_temp.split('!')[1]
        if (re.search(" and ",disease)):
            disease = disease.split(" and ")
        else:
            disease = [disease]

        # event date is mostly found within the first paragraph of the main text, sometimes the date is not found so the second paragraph is scanned as well just in case
        text = maintext.split('\n')[0]
        event_date_list = event_date_helper(text)
        if (len(event_date_list) == 0):
            text = maintext.split('\n')[1]
            event_date_list = event_date_helper(text)
        # if there's more than one disease, find the date that matches the right disease
            # same date
            # different dates
            # multiple dates
        
        
        #need year of publication date
        #publication_year = re.search('[0-9]{4}', publication_date).group()
        month = {
            'January': '1',
            'February': '2',
            'March': '3',
            'April': '4',
            'May': '5',
            'June': '6',
            'July': '7',
            'August': '8',
            'September': '9',
            'October': '10',
            'November': '11',
            'December': '12'
        }
        months = '|'.join(month.keys())
        # change dates to use ints and add /
        #temp = []
        #for event in event_date_list:
        #    get_month = re.search(months, event).group()
        #    event = event.replace(get_month, month[get_month])
        #    event = event.replace(' ','/')
        #    temp.append(event)
        #event_date_list = temp

        # change if there's 'and', 'or' between the dates
            # remove any dates between these dates
            # change to two dates with a - in between
            # if there's more dates than theres 2 disease reports

        # if a day and month matches another one then remove it 
        # if a day and month doesn't have a year, add the publication year
        # remove duplicate dates


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