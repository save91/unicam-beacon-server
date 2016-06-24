function connectDB(callback) {
  mongoClient.connect(dbConfig.testDBURL, function(err, db) {
    assert.equal(null, err);
    proximitysystem_test_db = db;
    console.log(“Connesso al server”);
    callback(0);
  });
}

function dropUserCollection(callback) {
  console.log("dropUserCollection");
  user = proximitysystem_test_db.collection('user');
  if (undefined != user) {
    user.drop(function(err, reply) {
      console.log('user collection dropped');
      callback(0);
    });
  } else {
    callback(0);
  }
}

/* Eliminare tutte le altre collection */

function closeDB(callback) {
  proximitysystem_test_db.close();
}

async.series([connectDB, dropUserCollection, closeDB]);
