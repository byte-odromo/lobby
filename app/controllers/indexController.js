var utils = require('../utils');

// indexController
/*var indexController = function(req, res, next) {
	var hash = utils.generateHash();
	res.redirect('/game/'+hash);
};*/
var indexController = function(req, res, next) {
	res.render('index.html');
};

module.exports = indexController;