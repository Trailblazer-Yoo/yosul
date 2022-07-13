from dataclasses import replace
import re

file = '2022.07.12_minutes'
with open(f'{file}.txt', 'r') as f:
    content = f.read()
content = content.replace('참석자 1', '선종').replace('참석자 2', '주형').replace('참석자 3', '지우').replace('참석자 4', '지우')
content = content.replace('이개','').replace('사실','').replace('응','').replace('만약에','').replace('뭔가',''
                ).replace('조금','').replace('근데','').replace('약간','').replace('솔직히','').replace('또',''
                ).replace('그러니까','').replace('이제','').replace('저희가','').replace('이거','').replace('너무','')
with open(f'{file}_pre.md', 'w') as f:
    f.write(content.replace('\n', '\n##### '))