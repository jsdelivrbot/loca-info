const express = require('express')
const path = require('path')
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');
var request = require('request-promise');
var Promise = require('bluebird');

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.post('/sample', function(req, res) {
    // console.log(req.body);

    let requestURI = 'http://openapi.seoul.go.kr:8088/48646e726e7373683130375a5444774a/json/RealtimeCityAir/1/25/';
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

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

