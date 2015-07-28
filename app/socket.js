module.exports = function(app,io) {
	// Socket
    app.roomList = {};
    io.on('connection', function(socket) {
        app.events.emit( 'socket.connection', socket );
        console.log('----connection-----');
        
        socket.on('disconnect', function( socket ) {
            console.log('----user disconnected----');
        });

        socket.on( 'createRoom', function( id ){
            var roomId = Math.random();
            socket.join( roomId );
            //socket.room = roomId;
            //app.roomList.push( { id: roomId, members: [] } );
            app.roomList[ roomId ] = [];
            app.roomList[ roomId ].push( id );

            socket.emit( 'onCreateRoom',  roomId );
            //io.sockets.to( socket.room ).emit( 'youAreIn',  id );
            //socket.broadcast.to( socket.room ).emit( 'youAreIn',  id );
            io.sockets.emit( 'onCreateNewRoom', roomId );
        });

        socket.on('getMembers', function( roomId ){
            socket.emit( 'onGetMembers', app.roomList[ roomId ] );
        });

        socket.on('getRooms', function(){
            var rooms = [];
            for( var el in app.roomList ){
                rooms.push( el );
            }
            socket.emit( 'onGetRooms', rooms );
        });

        socket.on('joinRoom', function( guess ) {
            socket.join( guess.roomId );
            //socket.room = guess.roomId;
            app.roomList[ guess.roomId ].push( guess.id );

            socket.emit( 'onJoinRoom',  guess.roomId );
            // emit to all, inlude the client
            // io.sockets.to(socket.room).emit('game', 'Nuevo player conectado');
            // emit to all, exlude the client
            socket.broadcast.to( guess.roomId ).emit('onNewJoinRoom', { id: guess.id });
        });
    });
};