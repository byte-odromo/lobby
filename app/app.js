module.exports = function() {
    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    var routes = require('./routes');
    var socket = require('./socket')(io);

    // Config
    app.use('/', routes);

    http.listen(3000, function() {
        console.log('listen');
    });
};