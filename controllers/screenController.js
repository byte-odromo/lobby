// screenController
var screenController = function(req, res, next) {
	res.render('screen', { id: req.params.id });
};

module.exports = screenController;