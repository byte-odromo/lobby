module.exports = function(io) {
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
};