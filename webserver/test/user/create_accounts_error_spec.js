TU1_UN = "test"
TU1_FN = "Test";
TU1_LN = "User1";
TU1_PW = "testUser123";
SP_APP_NAME = 'Proximity System';

var frisby = require('frisby');
var tc = require('../config/test_config');

frisby.create('POST missing firstName')
    .post(tc.url + '/user',
          { 'lastName' : TU1_LN,
            'username' : TU1_UN,
            'password' : TU1_PW })
    .expectStatus(400)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSON({'error' : 'Undefined First Name'})
.toss()
