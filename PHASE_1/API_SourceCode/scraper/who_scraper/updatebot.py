from bs4 import BeautifulSoup
from urllib.request import urlopen
from scrapy.crawler import CrawlerProcess
from who_scraper.spiders.reportbot import ReportbotSpider
import sqlite3
import os
import re

c = urlopen('https://www.who.int/csr/don/archive/year/en/')
contents = c.read()
soup = BeautifulSoup(contents,'html.parser')
date_links = soup.find_all('ul',{'class': 'list'})
# get the first year as it's in descending order 
date = date_links[0].find('li')
a = date.find('a')
most_recent_year = 'https://www.who.int' + a['href']

current_dir = os.getcwd()
index = current_dir.index('scraper')
database_path = current_dir[:index] + 'api\\who.db'

c = urlopen(most_recent_year)
contents = c.read()
soup = BeautifulSoup(contents,'html.parser')
actual_links = soup.find_all('ul',{'class':'auto_archive'})
check = 0
unscraped_links = []
for a in actual_links[0].find_all('li'):
    for l in a.find_all('a'):
        link = 'https://www.who.int'+ l['href']
        with sqlite3.connect(database_path) as db:
            cursor = db.cursor()
            sql = '''select URL from Article WHERE URL=?'''
            cursor.execute(sql, (link,))
            if (len(cursor.fetchall()) == 0):
                unscraped_links.append(link)
            else: 
                check = 1
                break
    if (check == 1):
        break

process = CrawlerProcess()
process.crawl(ReportbotSpider, start_urls=unscraped_links)
process.start()