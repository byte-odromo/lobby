var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Utils
var generateHash = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// Routes and controllers
app.get('/', function(req, res) {
    res.redirect('/game/'+generateHash());
});

app.get('/game/:hash', function(req, res) {
    res.sendFile(__dirname+'/public/game.html');
});

// Socket
io.on('connection', function(socket) {
    console.log('----connection-----');
    
    socket.on('disconnect', function() {
        console.log('----user disconnected----');
    });

    socket.on('joinRoom', function(id) {
        socket.join(id);
        socket.room = id;
    });

    socket.on('chat', function(msg) {
        console.log('mgs: ', msg);
        io.sockets.to(socket.room).emit('chat', msg);
    });

});

http.listen(3000, function() {
    console.log('listen');
});