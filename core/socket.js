// Socket

var socket = function(server, debug) {
	var socket = require('socket.io')(server);

    socket.on('connection', onConnection);

    function onConnection(socket) {
        debug('client connected');

        socket.on('message', function(message) {
            switch (JSON.parse(message).text) {
                case 'ping':
                    var response = JSON.stringify({
                        text: 'pong'
                    });
                    debug(message + ' : ' + response);
                    socket.send(response);

                    break;
                default:
                    debug('unknown message: ' + message);
            }
        });

        socket.on('close', function() {
            debug('socket connection closed');
        });

    };
}

module.exports = socket;