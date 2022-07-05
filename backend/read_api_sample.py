import requests
import pandas as pd
from pymongo import MongoClient

keys = ['S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB/FGnDuzloLHkpvLvTyddzf00SKndA/1naWcmH2ao5jg==',
        'sRrCYNnRHgfaquuCbMenLKhpMPLymkyrDW5T3LesX8uQ00oxDrhvmfMcI/TOVGqrnOvriGM1aKLAFIB6tQPf3w==',
        'KYnzJga7PnoRyXNVENDQkD5Ud7cbI/o/a7h/EbKR2AjRnGNYysJgMasRSJ+nis+96bWZ1YOigVVGXUzxzKQn0w==',
        'S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB/FGnDuzloLHkpvLvTyddzf00SKndA/1naWcmH2ao5jg==',
        'S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB/FGnDuzloLHkpvLvTyddzf00SKndA/1naWcmH2ao5jg==',
        'sRrCYNnRHgfaquuCbMenLKhpMPLymkyrDW5T3LesX8uQ00oxDrhvmfMcI/TOVGqrnOvriGM1aKLAFIB6tQPf3w==',
        'S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB/FGnDuzloLHkpvLvTyddzf00SKndA/1naWcmH2ao5jg==']

urls = ['https://api.odcloud.kr/api/15042292/v1/uddi:b4eddf41-0340-421f-9c22-8a70a9defee3',
        'https://api.odcloud.kr/api/15089109/v1/uddi:c7468573-84ff-4a92-a84b-884439ce23d3',
        'http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api']


collection_names = ['brewery_info','brewery_programs','festival_info','loc_info_kr','loc_info_en',
                    'sul_info01','sul_info02']

# 찾아가는 양조장 샘플
# url = 'https://api.odcloud.kr/api/15089109/v1/uddi:c7468573-84ff-4a92-a84b-884439ce23d3'
# key = 'S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB/FGnDuzloLHkpvLvTyddzf00SKndA/1naWcmH2ao5jg==' # decoding

# sample 3rd api
url = 'http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api'
key = 'KYnzJga7PnoRyXNVENDQkD5Ud7cbI/o/a7h/EbKR2AjRnGNYysJgMasRSJ+nis+96bWZ1YOigVVGXUzxzKQn0w=='
params = {'serviceKey' : key, 'pageNo' : '1', 'numOfRows' : '1000', 'type' : 'json'}
response = requests.get(url,params=params)
response.json()['response']['body']['items']


# 안될듯하다.. -> api 마다 호출 방식이 다름
response_bundle = []
for i in range(len(keys)):
    params = {'serviceKey' : keys[i], 'pageNo' : '1', 'numOfRows' : '100', 'perPage' : '100', 'type' : 'json'}
    response = requests.get(urls[i],params=params)
    response_bundle.append(response.json())

# response.json().keys()
# pd.DataFrame(response.json()['data'])

# write
my_client = MongoClient('mongodb://localhost:27017')
mydb = my_client['yosul_lamp']
mydb['programs'].insert_many(pd.DataFrame(response.json()['data']).to_dict('records'))

# read
my_client = MongoClient('mongodb://localhost:27017')
mydb = my_client['yosul_lamp']
pd.DataFrame(mydb['programs'].find()).drop('_id',axis=1)

# xml base - search festival example
url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival'
key = '?ServiceKey=S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB/FGnDuzloLHkpvLvTyddzf00SKndA/1naWcmH2ao5jg=='
option = '&contentTypeId=32&areaCode=4&sigunguCode=4&MobileOS=ETC&MobileApp=AppTest'
response = requests.get(url+key+option, params=params)

from bs4 import BeautifulSoup
xml_obj = BeautifulSoup(response.content,'lxml-xml')
tp = xml_obj.find_all('item')

columns = [tp[0].find_all()[i].name for i in range(len(tp[0]))]

import numpy as np
pd.DataFrame(np.array(tp).squeeze(),columns=columns)


