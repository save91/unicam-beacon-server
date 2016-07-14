TEST_USERS = [{'fn' : 'Test', 'ln' : 'User1',
               'un' : 'testuser1', 'pwd' : 'testUser123'},
              {'fn' : 'Test', 'ln' : 'User2',
               'un' : 'testuser2', 'pwd' : 'testUser123'},
              {'fn' : 'Test', 'ln' : 'User3',
               'un' : 'testuser3', 'pwd' : 'testUser123'}]

SP_APP_NAME = 'Proximity System';

var frisby = require('frisby');
var tc = require('../config/test_config');

TEST_USERS.forEach(function createUser(user, index, array) {
    frisby.create('POST user ' + user.un)
        .post(tc.url + '/user',
              { 'firstname' : user.fn,
                'lastname' : user.ln,
                'username' : user.un,
                'password' : user.pwd })
        .expectStatus(201)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .toss()
});

frisby.create('POST duplicate user ')
    .post(tc.url + '/user',
          { 'firstname' : TEST_USERS[0].fn,
            'lastname' : TEST_USERS[0].ln,
            'username' : TEST_USERS[0].un,
            'password' : TEST_USERS[0].pwd })
    .expectStatus(400)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
.toss()
