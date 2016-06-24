var express = require('express');

exports.addAPIRouter = function(app, mongoose) {

 	app.get('/*', function(req, res, next) {
 		res.contentType('application/json');
 		next();
 	});
 	app.post('/*', function(req, res, next) {
 		res.contentType('application/json');
 		next();
 	});
 	app.put('/*', function(req, res, next) {
 		res.contentType('application/json');
 		next();
 	});
 	app.delete('/*', function(req, res, next) {
 		res.contentType('application/json');
 		next();
});
var router = express.Router();

 	router.post('/user/enroll', function(req, res) {
 		logger.debug('Router for /user/enroll');

 	});
 	router.get('/feeds', function(req, res) {
 		logger.debug('Router for /feeds');

 	});
 	router.put('/feeds/subscribe', function(req, res) {
 		logger.debug('Router for /feeds');

  });
  	app.use('/api/v2.0', router);
}
