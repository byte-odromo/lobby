var UI = {
    showLobby: function(){
        document.getElementById( 'lobbyContainer' ).style.display = 'block';
        document.getElementById( 'roomContainer' ).style.display = 'none';
    },
    showRoom: function(){
        document.getElementById( 'lobbyContainer' ).style.display = 'none';
        document.getElementById( 'roomContainer' ).style.display = 'block';
        document.getElementById( 'roomId' ).innerHTML = app.roomId;
    },
    renderRoomList: function( rooms ){
        document.getElementById('roomListContainer').innerHTML = '';
        for( var el in rooms ){
            UI.renderRoom( rooms[el] );
        }
    },
    renderUsers: function( users ){
        document.getElementById('userListContainer').innerHTML = '';
        for( var el in users ){
            UI.renderUser( users[el] );
        }
    },
    renderNewUser: function( user ){
        UI.renderUser( user.id );
    },
    renderUser: function( userId, mustClear ){
        if( mustClear ){
            document.getElementById('userListContainer').innerHTML = '';
        }
        var container = document.getElementById('userListContainer');
        var item,
            you = userId == app.id? ' <-- YOU' : '';
        item = document.createElement('LI');
        item.innerHTML = "user: " + userId + you;
        container.appendChild( item );
    },
    renderRoom: function( roomId ){
        var container = document.getElementById('roomListContainer');
        var item, link;
        item = document.createElement('LI');
        link = document.createElement('A');
        link.onclick = function(){
            app.join( roomId );
        };
        link.innerHTML = "Room: " + roomId;
        item.appendChild( link );
        container.appendChild( item );
    }
}

var app = {
    socket: io.connect( 'localhost:3000', { 'sync disconnect on unload': true }),
    id: Math.random(),
    roomId: undefined,
    create: function(){
        this.socket.emit( 'createRoom', { roomId: null, userId: this.id } );
    },
    join: function( roomId ){
        this.socket.emit( 'joinRoom', { roomId: roomId, id: this.id } );
    },
    leaveRoom: function(){
        this.socket.emit( 'leaveRoom', { roomId: this.roomId, userId: this.id } );
    },
    boot: function(){
        UI.showLobby();

        this.socket.on( 'createRoom', function( roomId ){
            app.roomId = roomId;
            UI.showRoom();
            UI.renderUser( app.id, true );
        });

        this.socket.on( 'leaveRoom', function( msg ){
            UI.showLobby();
            app.socket.emit( 'getRooms' );
        });

        this.socket.on( 'newLeaveRoom', function(){
            app.socket.emit( 'getMembers', app.roomId );
        });

        this.socket.on( 'getMembers', function( arrMembers ){
            UI.renderUsers( arrMembers );
        });

        this.socket.on( 'closeRoom', function(){
            app.socket.emit('getRooms');
        });

        this.socket.on( 'joinRoom', function( roomId ){
            app.roomId = roomId;
            UI.showRoom( roomId );
            app.socket.emit( 'getMembers', roomId );
        });

        this.socket.on( 'newJoinRoom', function( newPlayer ){
            UI.renderNewUser( newPlayer );
        });

        this.socket.on( 'createNewRoom', function( roomId ){
            UI.renderRoom( roomId );
        });

        this.socket.on( 'getRooms', function( availableRooms ){
            UI.renderRoomList( availableRooms );
        });

        this.socket.emit( 'getRooms' );
    }
};