var gameController = function(req, res, next) {
	res.sendFile(__dirname+'/views/game.html');
};

module.exports = gameController;