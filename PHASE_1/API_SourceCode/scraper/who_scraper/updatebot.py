from bs4 import BeautifulSoup
from urllib.request import urlopen
from scrapy.crawler import CrawlerProcess
from who_scraper.spiders.reportbot import ReportbotSpider

c = urlopen('https://www.who.int/csr/don/archive/year/en/')
contents = c.read()
soup = BeautifulSoup(contents,'html.parser')
date_links = soup.find_all('ul',{'class': 'list'})
# get the first year as it's in descending order 
date = date_links[0].find('li')
a = date.find('a')
most_recent_year = 'https://www.who.int' + a['href']
c = urlopen(most_recent_year)
contents = c.read()
soup = BeautifulSoup(contents,'html.parser')
actual_links = soup.find_all('ul',{'class':'auto_archive'})
for a in actual_links[0].find_all('li'):
    for l in a.find_all('a'):
        # check if database has url in the article report
        # if yes then break
        # if no then call report bot with the start_urls = [l]