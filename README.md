# What is loca-info
간단한 지역정보 안내 서비스(loca 는 local의 축약형)  
https://loca-info.herokuapp.com

<br>

## 개발환경 세팅
#### 먼저 heroku 개발환경 설치가 필요합니다
1. heroku 계정생성
1. heroku-cli 설치
1. heroku login

#### 로컬 저장소 세팅
```sh
$ git clone https://git.heroku.com/loca-info.git
$ cd loca-info
$ npm install
```

#### 노드서버 실행
```sh
$ npm start
```
노드 서버는 5000 번 포트로 실행됩니다. http://localhost:5000


#### 리액트 개발시에는
auto-reloading 을 위해 `webpack-dev-server` 을 실행하고,
```sh
$ npm run dev-server
```
http://localhost:5050 로 접근

<br>

## 운영 배포
```
$ npm run prod-build
$ git push heroku master
```