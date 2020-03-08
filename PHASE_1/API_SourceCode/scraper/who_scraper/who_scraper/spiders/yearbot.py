# -*- coding: utf-8 -*-
import scrapy


class YearbotSpider(scrapy.Spider):
    name = 'yearbot'
    start_urls = ['https://www.who.int/csr/don/archive/year/en/']

    def parse(self, response):
        urls = response.css('.col_2-1_1 a::attr(href)').extract()
        for u in urls:
            url = 'who.int/' + u
            scraped_info = {
                'url': url
            }
            yield scraped_info
