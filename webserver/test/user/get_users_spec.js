SP_APP_NAME = 'Proximity System';

var frisby = require('frisby');
var tc = require('../config/test_config');

frisby.create('Get array of users with authorization')
  .addHeader('Authorization', 'Basic YWRtaW46MTIzNDU2')
  .get(tc.url + '/user')
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json; charset=utf-8')
  .toss()

frisby.create('Get array of users without authorization')
  .get(tc.url + '/user')
  .expectStatus(401)
  .expectHeader('Content-Type', 'application/json; charset=utf-8')
  .toss()
