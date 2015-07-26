// screenController
var indexController = function(req, res, next) {
	// TODO: move this to utils.js
	var generateHash = function() {
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ ) {
	    	text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }
	    return text;
	};

	var hash = generateHash();

	res.redirect('/screen/'+hash);
};

module.exports = indexController;