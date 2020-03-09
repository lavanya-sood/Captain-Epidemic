# -*- coding: utf-8 -*-
import scrapy
import re


class ReportbotSpider(scrapy.Spider):
    name = 'reportbot'
    start_urls = ['https://www.who.int/csr/don/2014_01_09_h5n1/en/','https://www.who.int/csr/don/2014_07_17_polio/en/','https://www.who.int/csr/don/2014_08_06_ebola/en/','https://www.who.int/csr/don/2014_07_17_ebola/en/','https://www.who.int/csr/don/05-March-2020-ebola-drc/en/','https://www.who.int/csr/don/1996_11_28c/en/','https://www.who.int/csr/don/2014_6_23polio/en/','https://www.who.int/csr/don/2014_01_09_h5n1/en/','https://www.who.int/csr/don/04-march-2020-measles-car/en/', 'https://www.who.int/csr/don/2008_12_26a/en/', 'https://www.who.int/csr/don/2013_11_26polio/en/', 'https://www.who.int/csr/don/28-september-2015-cholera/en/', 'https://www.who.int/csr/don/05-october-2018-monkeypox-nigeria/en/', 'https://www.who.int/csr/don/2010_04_30a/en/', 'https://www.who.int/csr/don/2008_01_02/en/', 'https://www.who.int/csr/don/2006_08_21/en/', 'https://www.who.int/csr/don/2003_09_30/en/', 'https://www.who.int/csr/don/2001_07_18/en/', 'https://www.who.int/csr/don/1999_12_22/en/', 'https://www.who.int/csr/don/1996_02_29b/en/', 'https://www.who.int/csr/don/19-december-2016-1-mers-saudi-arabia/en/', 'https://www.who.int/csr/don/06-october-2016-polio-nigeria/en/', 'https://www.who.int/csr/don/12-january-2020-novel-coronavirus-china/en/']

    def parse(self, response):
        headline = response.css(".headline::text").extract()[0]
        publication_date = re.findall('\d{4}_\d{2}_\d{2}', response.url)
        if len(publication_date) == 0:
            list_publication_date = response.url.split('don/')[1].split('-')[:3]
            publication_date = '_'.join(list_publication_date)

        disease_temp = response.css(".headline::text").extract()[0]
        disease_temp = re.sub(' [^0-9A-Za-z] | in | and |,', '!', disease_temp)
        disease = disease_temp.split('!')[0]
        if (re.search("^[0-9 ]+$", disease)):
            disease = disease_temp.split('!')[1]
        #convert yyyy_mm_dd and dd_month_yyyy for database
        
        scraped_info = {
            'url': response.url,
            'headline': headline,
            'publication-date': publication_date,
            'disease': disease
        }
        yield scraped_info