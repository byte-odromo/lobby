var objectMerge = require('object-merge');

module.exports = function(app,io) {
	// Socket
    app.roomList = {};
    //@TODO complete lobby events to be listened by games
    io.on('connection', function( socket ) {
        app.events.emit( 'socket.connection', { socket: socket } );
        console.log('----connection-----');
        
        socket.on('disconnect', function( socket ) {
            app.events.emit( 'socket.disconnect', { socket: socket } );
            console.log('----user disconnected----');
            console.log(socket);
        });

        socket.on( 'createRoom', function( params ){
            var roomId = params.roomId || Math.random();
            var userId = params.userId || Math.random();
            var roomAndUser = {
                roomId: roomId,
                userId: userId
            };
            var newParams = { socket: socket, params: objectMerge( params, roomAndUser ) };
            app.events.emit( 'socket.createRoom', newParams );

            socket.join( roomId );
            app.roomList[ roomId ] = [];
            app.roomList[ roomId ].push( userId );

            socket.emit( 'createRoom',  roomId );
            io.sockets.emit( 'createNewRoom', roomId );
        });

        socket.on('getMembers', function( roomId ){
            socket.emit( 'getMembers', app.roomList[ roomId ] );
        });

        socket.on('getRooms', function(){
            var rooms = [];
            for( var el in app.roomList ){
                rooms.push( el );
            }
            socket.emit( 'getRooms', rooms );
        });

        socket.on('joinRoom', function( guess ) {
            app.events.emit( 'socket.joinRoom', { socket: socket, params: guess } );
            //@TODO what happend if room doesn't exist?
            if( app.roomList[ guess.roomId ] ){
                socket.join( guess.roomId );
                app.roomList[ guess.roomId ].push( guess.id );

                socket.emit( 'joinRoom',  guess.roomId );
                // emit to all, include the client
                // io.sockets.to(socket.room).emit('game', 'Nuevo player conectado');
                // emit to all, exclude the client
                socket.broadcast.to( guess.roomId ).emit('newJoinRoom', { id: guess.id });
            }
        });

        socket.on( 'leaveRoom', function( data ){
            socket.leave( data.roomId );
            //loop on members of given room
            for( var i = 0; i < app.roomList[data.roomId].length; i++ ){
                //found position of member id
                if( app.roomList[data.roomId][i] == data.userId ){
                    //remove member from room list
                    app.roomList[data.roomId].splice( i, 1 );
                    //remove room if its empty
                    if( app.roomList[data.roomId].length == 0 ){
                        delete app.roomList[data.roomId];
                    }
                    break;
                }
            }

            if( !app.roomList[data.roomId] ){
                //update removed room
                io.sockets.emit( 'closeRoom', data.userId );
            }
            socket.emit( 'leaveRoom',  data.userId );
            socket.broadcast.to( data.roomId ).emit('newLeaveRoom', data.userId );
        })
    });
};