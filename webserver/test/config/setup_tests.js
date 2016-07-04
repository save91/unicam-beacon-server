var async = require("async");
var dbConfig = require("../../config/db.js");
var mongoClient = require('mongodb').MongoClient;
var assert = require("assert");

function connectDB(callback) {
  mongoClient.connect(dbConfig.testDBURL, function(err, db) {
    assert.equal(null, err);
    proximitysystem_test_db = db;
    console.log("Connesso al server");
    callback(0);
  });
}

function dropUserCollection(callback) {
  console.log("dropUserCollection");
  user = proximitysystem_test_db.collection('users');
  if (undefined != user) {
    user.drop(function(err, reply) {
      console.log('user collection dropped');
      callback(0);
    });
  } else {
    callback(0);
  }
}

function insertAdminInUserCollection(callback) {
  console.log("insertAdminInUserCollection");
  user = proximitysystem_test_db.collection('users');
  if (undefined != user) {
    user.insertOne( {
      "block": "false",
      "username": "admin",
      "firstname": "Admin",
      "lastname": "Admin",
      "permission": 0,
      "created": new Date("2016-06-29T13:48:53.935Z"),
      "photo": "img/account.jpg",
      "password": "123456",
      "theme": "red"
    }, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted a document into the users collection");
      callback(0);
    });
  } else {
    callback(0);
  }
}

function dropDeviceCollection(callback) {
  console.log("dropDeviceCollection");
  device = proximitysystem_test_db.collection('devices');
  if (undefined != device) {
    device.drop(function(err, reply) {
      console.log('device collection dropped');
      callback(0);
    });
  } else {
    callback(0);
  }
}

function dropBeaconCollection(callback) {
  console.log("dropBeaconCollection");
  beacon = proximitysystem_test_db.collection('beacons');
  if (undefined != beacon) {
    beacon.drop(function(err, reply) {
      console.log('beacon collection dropped');
      callback(0);
    });
  } else {
    callback(0);
  }
}

function closeDB(callback) {
  proximitysystem_test_db.close();
}

async.series([connectDB, dropUserCollection, insertAdminInUserCollection, dropDeviceCollection, dropBeaconCollection, closeDB]);
