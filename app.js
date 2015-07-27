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

    socket.on('joinRoom', function(guess) {
        socket.join(guess.id);
        socket.room = guess.id;
        socket.player = guess.player;

        // emit to all, inlude the client
        // io.sockets.to(socket.room).emit('game', 'Nuevo player conectado');
        // emit to all, exlude the client
        socket.broadcast.to(socket.room).emit('game', 'Nuevo player conectado');
    });

    socket.on('game', function(msg) {
        console.log('mgs: ', msg);
        io.sockets.to(socket.room).emit('game', msg);
    });

});

http.listen(3000, function() {
    console.log('listen');
});