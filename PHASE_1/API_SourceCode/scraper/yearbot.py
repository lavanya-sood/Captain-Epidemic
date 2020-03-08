# -*- coding: utf-8 -*-
import scrapy


class YearbotSpider(scrapy.Spider):
    name = 'yearbot'
    allowed_domains = ['https://www.who.int/csr/don/archive/year/en/']
    start_urls = ['http://https://www.who.int/csr/don/archive/year/en//']

    def parse(self, response):
        pass
