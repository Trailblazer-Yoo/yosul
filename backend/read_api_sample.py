import requests

# 전통주 체험프로그램 api
url = 'https://api.odcloud.kr/api/15089109/v1/uddi:c7468573-84ff-4a92-a84b-884439ce23d3'
key = 'sRrCYNnRHgfaquuCbMenLKhpMPLymkyrDW5T3LesX8uQ00oxDrhvmfMcI/TOVGqrnOvriGM1aKLAFIB6tQPf3w==' # decoding
params ={'serviceKey' : key, 'pageNo' : '1', 'numOfRows' : '100', 'type' : 'json'}
response = requests.get(url,params=params)

response.json()