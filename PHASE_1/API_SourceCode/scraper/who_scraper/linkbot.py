from bs4 import BeautifulSoup
from urllib.request import urlopen
from scrapy.crawler import CrawlerProcess
from who_scraper.spiders.reportbot import ReportbotSpider

c = urlopen('https://www.who.int/csr/don/archive/year/en/')
contents = c.read()
soup = BeautifulSoup(contents,'html.parser')
date_links = soup.find_all('ul',{'class': 'list'})
links = []
for l in date_links[0].find_all('li'):
    for a in l.find_all('a'):
        links.append('https://www.who.int' + a['href'])

disease_links = []
for l in links: 
    o = urlopen(l)
    contents = o.read()
    soup = BeautifulSoup(contents,'html.parser')
    actual_links = soup.find_all('ul',{'class':'auto_archive'})
    for a in actual_links[0].find_all('li'):
        for l in a.find_all('a'):
            disease_links.append('https://www.who.int'+l['href'])
#print(disease_links)

process = CrawlerProcess()
process.crawl(ReportbotSpider, start_urls=disease_links)
process.start()
