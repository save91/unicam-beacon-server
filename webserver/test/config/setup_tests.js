var async = require("async");
var dbConfig = require("../../config/db.js");
var mongoClient = require('mongodb').MongoClient;
var assert = require("assert");
var GPIO = [
        {"type":"output", "GPIO":3, "value":1},
        {"type":"output","GPIO":5,"value":1},
        {"type":"output","GPIO":7,"value":1},
        {"type":"output","GPIO":11,"value":1},
        {"type":"output","GPIO":13,"value":1},
        {"type":"output","GPIO":15,"value":1},
        {"type":"output","GPIO":19,"value":1},
        {"type":"output","GPIO":21,"value":1}];

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
  user = proximitysystem_test_db.collection('User');
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
  user = proximitysystem_test_db.collection('User');
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
      "theme": "altTheme"
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
  device = proximitysystem_test_db.collection('Device');
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
  beacon = proximitysystem_test_db.collection('Beacon');
  if (undefined != beacon) {
    beacon.drop(function(err, reply) {
      console.log('beacon collection dropped');
      callback(0);
    });
  } else {
    callback(0);
  }
}

function dropGPIOCollection(callback) {
  console.log("dropGPIOCollection");
  gpio = proximitysystem_test_db.collection('GPIO');
  if (undefined != gpio) {
    gpio.drop(function(err, reply) {
      console.log('gpio collection dropped');
      callback(0);
    });
  } else {
    callback(0);
  }
}

function insertGPIOInGPIOCollection(callback) {
  console.log("insertGPIOInGPIOCollection");
  var n = 0;
  gpio = proximitysystem_test_db.collection('GPIO');
  if (undefined != gpio) {
    GPIO.forEach(function createGPIO(gpios, index, array) {
      gpio.insertOne( {
        "type": gpios.type,
        "GPIO": gpios.GPIO,
        "value": gpios.value
      }, function(err, result) {
        assert.equal(err, null);
        n++;
        if(n === GPIO.length) {
          callback(0);
        }
      });
    });
  } else {
    callback(0);
  }
}

function closeDB(callback) {
  proximitysystem_test_db.close();
}

async.series([
  connectDB,
  dropUserCollection,
  insertAdminInUserCollection,
  dropDeviceCollection,
  dropBeaconCollection,
  dropGPIOCollection,
  insertGPIOInGPIOCollection,
  closeDB]);
