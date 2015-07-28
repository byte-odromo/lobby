var router = require('./routes');
/*var express = require('express');
var app = express();*/

var Game = function( app ){
	var game = {};
	router.get('/home', require('./controllers/myGameController'));
	/*app.use(function(req, res, next) {
		if( req.url == '/' ){
			res.redirect('/home');
		}else{
			next();
		}
	});*/

	app.events.on('socket.connection', function( socket ){
		console.log('ON socket.connection');
	})

	return {

	}
}

module.exports = Game;