// screenController
var screenController = function(req, res, next) {
	res.render('screen', { id: req.param('id') });
};

module.exports = screenController;