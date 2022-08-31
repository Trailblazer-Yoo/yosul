from heapq import merge
import requests
# import json
# import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

class Firebase_updater:
    def __init__(self):
        db_url = ''
        cred = credentials.Certificate()
        firebase_admin.initialize_app(cred, {'databaseURL':db_url})
        self.db = firestore.client()

    def get_festival_api(self):
        url = 'http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api'
        key = 'KYnzJga7PnoRyXNVENDQkD5Ud7cbI/o/a7h/EbKR2AjRnGNYysJgMasRSJ+nis+96bWZ1YOigVVGXUzxzKQn0w=='
        params ={'serviceKey' : key, 'pageNo' : '1', 'numOfRows' : '10000', 'type' : 'json'}
        response = requests.get(url, params=params)

        data = response.json()['response']['body']['items']
        length = range(len(data))
        dictionary = dict(zip(length, data))

        doc_ref = self.db.collection(u'global').document(u'festivals')
        
        for key, value in dictionary.items():
            doc_ref.set({dictionary[key]['fstvlNm']: value}, merge=True)

    def get_sul_api(self):
        url = 'https://api.odcloud.kr/api/15048755/v1/uddi:fec53d3a-2bef-4494-b50e-f4e566f403e0'
        key = 'S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB/FGnDuzloLHkpvLvTyddzf00SKndA/1naWcmH2ao5jg=='
        params = {'serviceKey' : key, 'pageNo' : '1', 'numOfRows' : '1000', 'type' : 'json'}
        response = requests.get(url, params=params)
        per_page = response.json()['totalCount']
        params = {'serviceKey' : key, 'pageNo' : '1', 'numOfRows' : '1000','perPage': per_page, 'type' : 'json'}
        response = requests.get(url, params=params)

        data = response.json()['data']

        new_names = ['capacity', 'alcohol', 'name', 'craft', 'materials']
        old_names = list(data[0].keys())
        for i in data:
            for j in range(len(old_names)):
                i[new_names[j]] = i.pop(old_names[j])

        length = range(len(data))
        dictionary = dict(zip(length, data))

        doc_ref = self.db.collection(u'global').document(u'drinks')
        
        for key, value in dictionary.items():
            doc_ref.set({dictionary[key]['name']: value}, merge=True)

    def get_brewery_api(self):
        url = 'https://api.odcloud.kr/api/15089109/v1/uddi:c7468573-84ff-4a92-a84b-884439ce23d3'
        key = 'sRrCYNnRHgfaquuCbMenLKhpMPLymkyrDW5T3LesX8uQ00oxDrhvmfMcI/TOVGqrnOvriGM1aKLAFIB6tQPf3w=='
        params = {'serviceKey' : key, 'pageNo' : '1', 'numOfRows' : '100','perPage':'100', 'type' : 'json'}
        response = requests.get(url, params=params)

        data = response.json()['data']

        new_names = ['activity', 'regular_visit', 'time', 'name', 'address', 'telephone', 'reservation', 'place', 'sul_type', 'activity_name', 'cost', 'hompage']
        old_names = list(data[0].keys())
        for i in data:
            for j in range(len(old_names)):
                i[new_names[j]] = i.pop(old_names[j])

        length = range(len(data))
        dictionary = dict(zip(length, data))

        doc_ref = self.db.collection(u'global').document(u'breweries')
        
        for key, value in dictionary.items():
            doc_ref.set({dictionary[key]['name']: value}, merge=True)
