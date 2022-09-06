from bs4 import BeautifulSoup
import requests
import re
import pandas as pd
import sqlite3

class DataCrawler:
    def __init__(self):
        self.conn = sqlite3.connect("thesool.db")

        self.get_page_url()

    def get_page_url(self):
        headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'}
        
        page_urls = []
        for i in range (71):
            num = str(i + 1)
            url = f"https://thesool.com/front/find/M000000082/list.do?searchType=2&searchKey=&searchKind=&levelType=&searchString=&productId=&pageIndex={num}&categoryNm=&kind="
            res = requests.get(url, headers = headers)
            bs = BeautifulSoup(res.text, 'html.parser')
            imgs = bs.find('div', {'class':'product-list'}).find_all('img')

            for i in imgs:
                if 'label' in i['src']:
                    continue
                product_id = i['src'].split('&')[0][-10:]
                page_url = f"https://thesool.com/front/find/M000000082/view.do?searchType=2&searchKey=&searchKind=&levelType=&searchString=&productId={product_id}&pageIndex={num}&categoryNm=&kind="
                page_urls.append(page_url)

        self.get_data(page_urls)

    def get_data(self, product_url_list):
        headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'}
        
        all_data  = []  
        for url in product_url_list:
            res = requests.get(url, headers = headers)
            bs = BeautifulSoup(res.text, 'html.parser')

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
            except: 
                pass

            try:
                sul_etc = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[5].text.replace('\r','').replace('\n','').replace('\t','')
            except:
                pass

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
        
        self.convert_to_df(all_data)

    def convert_to_df(self, data):
        df = pd.DataFrame(data, columns = ['sul_name','sul_type','sul_material','sul_alcohol','sul_capacity','sul_img', 'sul_prize','sul_etc', 'sul_detail_info','sul_match_food','distillery_name','distillery_address','distillery_homepage','distillery_phone']) 

        self.update_db(df)

    def update_db(self, df):
        df.to_sql('sul_data', self.conn, if_exists='replace')
        self.conn.commit()

        new = pd.read_sql("SELECT * FROM sul_data", self.conn, index_col=None)
        print(new) # 확인

        self.conn.close()

        print('작업이 완료되었습니다.')
    

dc = DataCrawler()
