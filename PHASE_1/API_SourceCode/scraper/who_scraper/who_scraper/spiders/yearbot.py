# -*- coding: utf-8 -*-
import scrapy
import json


class YearbotSpider(scrapy.Spider):
    name = 'yearbot'
    start_urls = ['https://www.who.int/csr/don/archive/year/en/']

    def parse(self, response):
        urls = response.css('.col_2-1_1 a::attr(href)').extract()
        jsonOutput = {'url': []}
        for u in urls:
            url = 'who.int/' + u
            scraped_info = {
                'url': url
            }
            yield scraped_info
            jsonOutput['url'].append(url)
        with open('year-urls.txt', 'w') as yearUrls:
            json.dump(jsonOutput, yearUrls)
