TU1_UN = "admin"
TU1_PW = "123456";
TU2_UN = "paolo"
TU2_PW = "1234567";
SP_APP_NAME = 'Proximity System';

var frisby = require('frisby');
var tc = require('./config/test_config');

frisby.create('POST success login')
    .post(tc.url + '/user/login',
          { 'username' : TU1_UN,
            'password' : TU1_PW })
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
.toss()

frisby.create('POST error login')
    .post(tc.url + '/user/login',
          { 'username' : TU2_UN,
            'password' : TU2_PW })
    .expectStatus(400)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
.toss()

frisby.create('POST login without body')
    .post(tc.url + '/user/login',
          {})
    .expectStatus(400)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
.toss()

frisby.create('POST login without password')
    .post(tc.url + '/user/login',
          {'username' : TU1_UN})
    .expectStatus(400)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
.toss()
