TEST_USERS = [{'fn' : 'Test', 'ln' : 'User1',
               'un' : 'testuser1', 'pwd' : 'testUser123'},
              {'fn' : 'Test', 'ln' : 'User2',
               'un' : 'testuser2', 'pwd' : 'testUser123'},
              {'fn' : 'Test', 'ln' : 'User3',
               'un' : 'testuser3', 'pwd' : 'testUser123'}]

SP_APP_NAME = 'Reader Test';

var frisby = require('frisby');
var tc = require('./config/test_config');

TEST_USERS.forEach(function createUser(user, index, array) {
    frisby.create('POST enroll user ' + user.email)
        .post(tc.url + '/user',
              { 'firstName' : user.fn,
                'lastName' : user.ln,
                'username' : user.un,
                'password' : user.pwd })
        .expectStatus(201)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .toss()
});

frisby.create('POST enroll duplicate user ')
    .post(tc.url + '/user',
          { 'firstName' : TEST_USERS[0].fn,
            'lastName' : TEST_USERS[0].ln,
            'username' : TEST_USERS[0].un,
            'password' : TEST_USERS[0].pwd })
    .expectStatus(400)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSON({'error' : 'Account with that username already exists.  Please choose another username.'})
.toss()
