TU1_UN = "test6"
TU1_FN = "Test";
TU1_LN = "User10";
TU1_PW = "testUser123";
SP_APP_NAME = 'Proximity System';

var frisby = require('frisby');
var tc = require('../config/test_config');

frisby.create('POST missing firstName')
    .post(tc.url + '/user',
          { 'lastname' : TU1_LN,
            'username' : TU1_UN,
            'password' : TU1_PW })
    .expectStatus(400)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes({'msg' : String})
.toss()
