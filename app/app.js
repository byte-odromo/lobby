module.exports = function() {
    var express = require('express');
    var app = express();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    var routes = require('./routes');
    var socket = require('./socket')(io);

    // Config
    app.use('/', routes);
    app.set('views', __dirname + '/views');
    app.engine('html', require('ejs').renderFile);
    app.use(express.static('public'));

    http.listen(3000, function() {
        console.log('listen');
    });
};