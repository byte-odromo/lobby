var socket = require('../core/socket');

var indexTest = function(req, res, next) {
	socket.test();
}
module.exports = indexTest;