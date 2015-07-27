var utils = require('../utils');

// indexController
var indexController = function(req, res, next) {
	var hash = utils.generateHash();
	res.redirect('/game/'+hash);
};

module.exports = indexController;