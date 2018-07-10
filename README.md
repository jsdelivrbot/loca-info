# What is loca-info
간단한 지역정보 안내 서비스(loca 는 local의 축약형)  
https://loca-info.herokuapp.com

## 개발환경 세팅
`npm start` 는 5000 번 포트로 실행됩니다
```sh
$ git clone https://git.heroku.com/loca-info.git
$ cd loca-info
$ npm install
$ npm start
```

## webpack-dev-server 실행
`webpack-dev-server` 는 7777 포트로 실행
```sh
$ npm run dev-server
```

## 운영 배포
```
$ git push heroku master
```