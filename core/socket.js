// Socket
var socket = null;
var debug = null;
var init = function(server, debugProvider ) {
	socket = require('socket.io')(server);
    debug = debugProvider;

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
var test = function(){
    if( socket ){
        var response = JSON.stringify({
            text: 'POW!'
        });
        socket.send(response);
        debug(response);
    }
    
}

module.exports = {
    init: init,
    test: test
};