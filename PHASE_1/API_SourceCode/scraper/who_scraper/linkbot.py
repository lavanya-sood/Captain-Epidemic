from bs4 import BeautifulSoup
from urllib.request import urlopen
from scrapy.crawler import CrawlerProcess
from who_scraper.spiders.reportbot import ReportbotSpider
from scrapy.utils.project import get_project_settings

class LinkBot:
    def get_date_links(self):
        c = urlopen('https://www.who.int/csr/don/archive/year/en/')
        contents = c.read()
        soup = BeautifulSoup(contents,'html.parser')
        date_links = soup.find_all('ul',{'class': 'list'})
        links = []
        for l in date_links[0].find_all('li'):
            for a in l.find_all('a'):
                links.append('https://www.who.int' + a['href'])
        return links

    def get_all_reports(self):
        links = self.get_date_links()
        disease_links = []
        for l in links: 
            o = urlopen(l)
            contents = o.read()
            soup = BeautifulSoup(contents,'html.parser')
            actual_links = soup.find_all('ul',{'class':'auto_archive'})
            for a in actual_links[0].find_all('li'):
                for l in a.find_all('a'):
                    disease_links.append('https://www.who.int'+l['href'])
        return disease_links

    def crawl_all_reports(self):
        disease_links = self.get_all_reports()
        settings = get_project_settings()
        process = CrawlerProcess(settings)
        process.crawl(ReportbotSpider, start_urls=['https://www.who.int/csr/don/6-november-2017-dengue-burkina-faso/en/','https://www.who.int/csr/don/2010_10_25a/en/','https://www.who.int/csr/don/2014_01_09_h5n1/en/','https://www.who.int/csr/don/2014_07_17_polio/en/','https://www.who.int/csr/don/2014_08_06_ebola/en/','https://www.who.int/csr/don/2014_07_17_ebola/en/','https://www.who.int/csr/don/05-March-2020-ebola-drc/en/','https://www.who.int/csr/don/1996_11_28c/en/','https://www.who.int/csr/don/2014_6_23polio/en/','https://www.who.int/csr/don/2014_01_09_h5n1/en/','https://www.who.int/csr/don/04-march-2020-measles-car/en/', 'https://www.who.int/csr/don/2008_12_26a/en/', 'https://www.who.int/csr/don/2013_11_26polio/en/', 'https://www.who.int/csr/don/28-september-2015-cholera/en/', 'https://www.who.int/csr/don/05-october-2018-monkeypox-nigeria/en/', 'https://www.who.int/csr/don/2010_04_30a/en/', 'https://www.who.int/csr/don/2008_01_02/en/', 'https://www.who.int/csr/don/2006_08_21/en/', 'https://www.who.int/csr/don/2003_09_30/en/', 'https://www.who.int/csr/don/2001_07_18/en/', 'https://www.who.int/csr/don/1999_12_22/en/', 'https://www.who.int/csr/don/1996_02_29b/en/', 'https://www.who.int/csr/don/19-december-2016-1-mers-saudi-arabia/en/', 'https://www.who.int/csr/don/06-october-2016-polio-nigeria/en/', 'https://www.who.int/csr/don/12-january-2020-novel-coronavirus-china/en/','https://www.who.int/csr/don/03-june-2016-oropouche-peru/en/'])
        process.start()

t = LinkBot()
t.crawl_all_reports()