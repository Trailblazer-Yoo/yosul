
import requests
from bs4 import BeautifulSoup
# import json
# import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

class Firebase_updater:
    def __init__(self):
        db_url = 'https://kakao-test1.firebaseio.com/'
        cred = credentials.Certificate("kakao-test1-firebase-adminsdk-crjqj-a1b52b8196.json")
        firebase_admin.initialize_app(cred, {'databaseURL':db_url})
        self.db = firestore.client()

    def get_region_code(self):
        url = 'http://apis.data.go.kr/B551011/KorService/areaCode'
        key = 'S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB/FGnDuzloLHkpvLvTyddzf00SKndA/1naWcmH2ao5jg=='
        params = {'serviceKey' : key, 'pageNo' : '1', 'numOfRows' : '10000', 'MobileApp': 'AppTest', 'MobileOS': 'ETC', '_type' : 'json'}
        response = requests.get(url, params=params)

        area_code = response.json()['response']['body']['items']['item']
        sigun_code = {}
        for code in area_code:
            areaCode = code['code']
            params = {'serviceKey' : key, 'pageNo' : '1', 'numOfRows' : '10000', 'MobileApp': 'AppTest', 'MobileOS': 'ETC', 'areaCode': areaCode, '_type' : 'json'}
            response = requests.get(url, params=params)
            sigun_code[areaCode] =  response.json()['response']['body']['items']['item']

        return area_code, sigun_code

    def get_sul_api(self):
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

        types = ['탁주', '약주, 청주', '과실주', '증류주', '리큐르, 기타주류']
        (area_code, sigun_code) = self.get_region_code()
        shorts = ['경기', '경북', '경남', '충북', '충남', '전북', '전남', '제주']
        fulls = ['경기도', '경상북도', '경상남도', '충청북도', '충청남도', '전라북도', '전라남도', '제주도']
        
        dictionary  = {}  
        for url in page_urls:
            res = requests.get(url, headers = headers)
            bs = BeautifulSoup(res.text, 'html.parser')

            data = {}
            
            soolName = bs.find('div', {'class':'product-view'}).find('dt', {'class':'subject'}).text.replace('+', ' ').replace('/', ', ')
            soolType = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find('span').text.replace('\r','').replace('\n','').replace('\t','').replace('+', ', ').replace('/', ', ')
            typeCode = types.index(soolType)
            soolMaterial = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[1].text.replace('\r','').replace('\n','').replace('\t','').replace('+', ', ').replace('/', ', ')
            soolAlcohol = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[2].text.replace('\r','').replace('\n','').replace('\t','').replace(' \xa0','')
            soolCapacity = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[3].text.replace('\r','').replace('\n','').replace('\t','').replace('+', ', ').replace('/', ', ')
            # soolImg = bs.find('div', {'class':'product-view'}).find('div', {'class':'img'}).find("img")["src"]
            # soolUrl = 'https://thesool.com'+soolImg

            try:
                soolPrize = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[4].text.replace('\r','').replace('\n','').replace('\t','').replace('+', ', ').replace('/', ', ')
            except: 
                pass

            try:
                soolEtc = bs.find('div', {'class':'info'}).find('ul', {'class':'info-list'}).find_all('span')[5].text.replace('\r','').replace('\n','').replace('\t','').replace('+', ', ').replace('/', ', ')
            except:
                pass

            soolDetailInfo = bs.find('dd', {'class':'intro'}).find('div', {'class':'text'}).text.replace('\r','').replace('\n','').replace('\t','').replace('+', ', ').replace('/', ', ')
            soolMatchFood = bs.find('dd', {'class':'food'}).find('div', {'class':'text'}).text.replace('\r','').replace('\n','').replace('\t','').replace('+', ', ').replace('/', ', ')
            breweryName = bs.find('dd', {'class':'place'}).find('div', {'class':'text'}).find('span').text.replace('+', ', ').replace('/', ', ')
            breweryAddress = bs.find('dd', {'class':'place'}).find('div', {'class':'text'}).find_all('span')[1].text
            ad = breweryAddress.split()
            if len(ad) > 0 and ad[0] in shorts:
                idx = shorts.index(ad[0])
                ad[0] = fulls[idx]
                breweryAddress = ' '.join(ad)
                for area in area_code:
                    ad1 = breweryAddress.split()[0]
                    ad2 = breweryAddress.split()[1]
                    if area['name'] in ad1:
                        data['areaCode'] = area['code']
                        for sigun in sigun_code[area['code']]:
                            if sigun['name'] in ad2:
                                data['sigunCode'] = sigun['code']
                                continue

            if breweryAddress == "":
                breweryAddress = " None "
            breweryHomepage = bs.find('dd', {'class':'place'}).find('div', {'class':'text'}).find_all('span')[2].text.replace('\r','').replace('\n','').replace('\t','')
            breweryPhone = bs.find('dd', {'class':'place'}).find('div', {'class':'text'}).find_all('li')[3].text.replace('문의','')
            
            data['soolName'] = soolName
            data['soolType'] = soolType
            data['typeCode'] = typeCode
            data['soolMaterial'] = soolMaterial
            data['soolAlcohol'] = soolAlcohol
            data['soolCapacity'] = soolCapacity
            data['soolPrize'] = soolPrize
            data['soolEtc'] = soolEtc
            data['soolDetailInfo'] = soolDetailInfo
            data['soolMatchFood'] = soolMatchFood
            data['breweryName'] = breweryName
            data['breweryAddress'] = breweryAddress
            data['breweryHomepage'] = breweryHomepage
            data['breweryPhone'] = breweryPhone
            data['likesByUsers'] = []
            data['bookmarksByUsers'] = []

            dictionary[soolName] = data

        doc_ref = self.db.collection(u'global').document(u'drinks')
        
        for key, value in dictionary.items():
            doc_ref.set({key: value}, merge=True)

    def get_brewery_api(self):
        url = 'https://api.odcloud.kr/api/15089109/v1/uddi:c7468573-84ff-4a92-a84b-884439ce23d3'
        key = 'sRrCYNnRHgfaquuCbMenLKhpMPLymkyrDW5T3LesX8uQ00oxDrhvmfMcI/TOVGqrnOvriGM1aKLAFIB6tQPf3w=='
        params = {'serviceKey' : key, 'pageNo' : '1', 'numOfRows' : '100','perPage':'100', 'type' : 'json'}
        response = requests.get(url, params=params)

        data = response.json()['data']

        (area_code, sigun_code) = self.get_region_code()

        shorts = ['경기', '경북', '경남', '충북', '충남', '전북', '전남', '제주']
        fulls = ['경기도', '경상북도', '경상남도', '충청북도', '충청남도', '전라북도', '전라남도', '제주도']

        new_names = ['activity', 'regularVisit', 'time', 'name', 'address', 'telephone', 'reservation', 'place', 'soolType', 'activityName', 'cost', 'hompage']
        old_names = list(data[0].keys())
        for i in data:
            ad = i[old_names[4]].split()
            if ad[0] in shorts:
                idx = shorts.index(ad[0])
                ad[0] = fulls[idx]
                i[old_names[4]] = ' '.join(ad)
            for area in area_code:
                ad1 = i[old_names[4]].split()[0]
                ad2 = i[old_names[4]].split()[1]
                if area['name'] in ad1:
                    i['areaCode'] = area['code']
                    for sigun in sigun_code[area['code']]:
                        if sigun['name'] in ad2:
                            i['sigunCode'] = sigun['code']
                            continue
            for j in range(len(old_names)):
                i[new_names[j]] = i.pop(old_names[j])

        length = range(len(data))
        dictionary = dict(zip(length, data))

        doc_ref = self.db.collection(u'global').document(u'breweries')
        
        for key, value in dictionary.items():
            doc_ref.set({dictionary[key]['name']: value}, merge=True)

fu = Firebase_updater()
fu.get_sul_api()
# fu.get_brewery_api()