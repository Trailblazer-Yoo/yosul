from bs4 import BeautifulSoup
import requests
import re
import pandas as pd

class DataCrawler:
    def __init__(self):
        pass

    def get_page_url(self):
        page_url = []
        for i in range (71):
            num = str(i + 1)
            url = "https://thesool.com/front/find/M000000082/list.do?searchType=2&searchKey=&searchKind=&levelType=&searchString=&productId=&pageIndex="+num+"&categoryNm=&kind="
            page_url.append(url)
        return page_url

    def get_data(product_url_list):
        headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'}
        all_data  = []    
        for url in product_url_list:
            res = requests.get(url, headers = headers)
            bs = BeautifulSoup(res.text,'html.parser')
            data = []
            sul_name = bs.find('div', {'class':'product-view'}).find('dt', {'class':'subject'}).text
            sul_type = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find('span').text.replace('\r','').replace('\n','').replace('\t','')
            sul_material = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[1].text.replace('\r','').replace('\n','').replace('\t','')
            sul_alcohol = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[2].text.replace('\r','').replace('\n','').replace('\t','').replace(' \xa0','')
            sul_capacity = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[3].text.replace('\r','').replace('\n','').replace('\t','')
            sul_img = bs.find('div', {'class':'product-view'}).find('div', {'class':'img'}).find("img")["src"]
            sul_url = 'https://thesool.com'+sul_img
            try:
                sul_prize = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[4].text.replace('\r','').replace('\n','').replace('\t','')
            except: None
            try:
                sul_etc = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[5].text.replace('\r','').replace('\n','').replace('\t','')
            except:
                None
            sul_detail_info = bs.find('dd', {'class':'intro'}).find('div', {'class':'text'}).text.replace('\r','').replace('\n','').replace('\t','')
            sul_match_food = bs.find('dd', {'class':'food'}).find('div', {'class':'text'}).text.replace('\r','').replace('\n','').replace('\t','')
            distillery_name = bs.find('dd', {'class':'place'}).find('div', {'class':'text'}).find('span').text
            distillery_address = bs.find('dd', {'class':'place'}).find('div', {'class':'text'}).find_all('span')[1].text
            distillery_homepage = bs.find('dd', {'class':'place'}).find('div', {'class':'text'}).find_all('span')[2].text.replace('\r','').replace('\n','').replace('\t','')
            distillery_phone = bs.find('dd', {'class':'place'}).find('div', {'class':'text'}).find_all('li')[3].text.replace('문의','')
            data.append(sul_name)
            data.append(sul_type)
            data.append(sul_material)
            data.append(sul_alcohol)
            data.append(sul_capacity)
            data.append(sul_url)
            data.append(sul_prize)
            data.append(sul_etc)
            data.append(sul_detail_info)
            data.append(sul_match_food)
            data.append(distillery_name)
            data.append(distillery_address)
            data.append(distillery_homepage)
            data.append(distillery_phone)
            all_data.append(data)
        return all_data 

    
    def convert_to_df(self,data):
        df = pd.DataFrame(data, columns = ['주종명','주종','재료','도수','용량','이미지', '수상내역','기타', '상세설명','페어링 음식','양조장_이름','양조장_주소','양조장_홈페이지','양조장_전화번호']) 
        return df  