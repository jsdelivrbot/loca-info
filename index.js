const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))


// var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var request = require('request-promise');
var Promise = require('bluebird');
// var request = Promise.promisifyAll(require('request'), {multiArgs: true});

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 서울시 공공API 미세먼지 데이터 
const requestURI = 'http://openapi.seoul.go.kr:8088/48646e726e7373683130375a5444774a/json/RealtimeCityAir/1/25/';
// index page 
app.get('/', (req,res) => res.render('pages/index'));


// 미세먼지 데이터 (xhr get)
app.get('/allData' , function(req, res) {
	request(requestURI)
		.then(body => {
			console.log(body);
			let resJSON = JSON.parse(body);
			res.json(resJSON);
		})
		.catch(err => {
			console.log(err);
		})
})

// 미세먼지 데이터 (xhr post 조건값 있을 때만 이리로 옴...)
app.post('/sample', function(req, res) {
    // console.log(req.body);
    
    let reqJSON = req.body;
    let urlList = [];
    let resJSON = [];
    
    //url list make
    for(let i = 0 ; i < reqJSON.length; i++) {
        urlList.push(requestURI + encodeURI(reqJSON[i].area));
    }

    Promise.map(urlList , function(url){
        return request(url)
            .then(function(body) {
                let responseData = JSON.parse(body);
                return responseData.RealtimeCityAir.row;
            })
    }).then(function(response) {
        for ( let i = 0 ; i < response.length; i++) {
            resJSON = resJSON.concat(response[i]);
        }
        res.json(resJSON);
    })
});


app.listen(PORT, function () {
  console.log(`Listening on ${ PORT }`);
});
