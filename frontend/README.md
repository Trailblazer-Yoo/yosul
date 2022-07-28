# 프론트엔드 규칙

##### 1. __useEffect__ __무.조.건.__ __사용__
2. 숏코딩이 아닌 가독성을 중심으로 코드 작성
3. prettier 기준으로 코드 정리
4. 각자 한 페이지를 맡아서 구현하고 피드백 형식으로 진행
5. git 관리는 branch를 사용(master / 선종 : ysj, 주형 : pjh, 지우 : sjw)
6. 19일까지 디자인 픽스(80% 이상)
7. 회의는 네이버 클로바를 이용해 기록
8. 구현한 함수는 기능과 코드를 utils.md에 기록
9. 디자인은 design.js에 구현

# git fork 하는 법
### 1. fork란?
fork는 '상대방' git repository를 복사해서 '나'의 레퍼지토리로 만드는 행위를 의미. '내' 레퍼지토리는 복사본이므로 '상대방' 레퍼지토리에 반영되지 않는다. 따라서 작업을 따로 할 수 있다는 장점과 복사본에서 작업을 하므로 깃 충돌로 인해 파일이 삭제되는 오류를 방지할 수 있다.

### 2. fork를 해보자 !
1. fork를 한다.

<img src="https://user-images.githubusercontent.com/97590480/181438227-cd1e181b-f0da-42c7-a39b-b654c85690d3.png">

- 빨간색 박스에서 fork를 눌러 fork를 하자. 그러면 내 래퍼지토리에 복사본이 생긴다.

<img src="https://user-images.githubusercontent.com/97590480/181438459-d2d47f07-b4f2-4240-b773-a32dd4ec2395.png">

2. 로컬에 클론을 하자.

<img src="https://user-images.githubusercontent.com/97590480/181438653-9ec494eb-eae0-4fc8-976f-8e8cc372a6b5.png">

- `git clone [내 레퍼지토리의 fork한 복사본 주소]`를 원하는 디렉토리에 클론해주자.

<img src="https://user-images.githubusercontent.com/97590480/181438661-3165219d-3a81-40b4-9479-9e0918de2fde.png">

- `git remote -v`로 리모트를 확인해보면 내 레퍼지토리만 있는 것을 볼 수 있다.

3. original repository를 연결하자.

<img src="https://user-images.githubusercontent.com/97590480/181439306-f5b3a329-1e30-4cfe-865f-ccc32281eaef.png">

- 복사본을 연결했다면 원본을 연결해줘야 복사본 작업물을 원본에 보낼 수 있다.
- `git remote add upstream [상대방의 원본 레퍼지토리 주소]`

<img src="https://user-images.githubusercontent.com/97590480/181439346-cd52e8b1-59c4-4c00-a50e-2a889cb57ef3.png">

- 리모트를 확인해보면 upstream으로 등록된 것을 볼 수 있다.

### 3. 원본의 변경사항을 반영해주기(git pull)
<img src="https://user-images.githubusercontent.com/97590480/181439539-e680e95f-8db2-4479-987d-a722ae522efa.png">

- 원본의 변경사항이 생겼다면 우리 복사본에도 반영해줘야 일에 차질이 없을 것이다.
- `git pull upstream master`를 입력해주자. 여기서 `master`는 original 레퍼지토리의 메인 브랜치를 의미한다. 메인 브랜치 이름이 hello라면 `hello`로 입력해줘야 한다.

### 4. 내 작업물을 내 레퍼지토리(복사본)에 반영하기
- 내 복사본의 이름은 `origin`이므로 다음 명령어를 입력해준다.
```
git add .
git commit -m "commit_name"
git push origin master
```
- fork 의 장점인 메인 브랜치를 이용할 수 있다.

### 5. 내 작업물을 original 레퍼지토리에 보내기
- 열심히 일한 작업물을 원본에 반영하고 싶다면 다음 명령어를 입력하자.
```
git add .
git commit -m "commit_name"
git push upstream master
```
