var app = {
  socket: io(),
  id: Math.random(),
  roomId: undefined,
  newRoom: function(){
    window.location.href = "./rooms/" + Math.random();
  },
  create: function(){
    this.socket.emit( 'createRoom', this.id );
  },
  join: function( roomId ){
    this.socket.emit( 'joinRoom', { roomId: roomId, id: this.id } );
  },
  boot: function(){
    this.socket.on( 'onCreateRoom', function( roomId ){
      this.roomId = roomId;
      console.log( 'you created room:' );
      console.log( this.roomId );
    });

    this.socket.on( 'onRoomOut', function( msg ){
      console.log( msg );
    });

    this.socket.on( 'onGetMembers', function( arrMembers ){
      console.log( 'Members:' );
      console.log( arrMembers );
    });

    this.socket.on( 'onJoinRoom', function( roomId ){
      console.log( 'onJoinRoom:' );
      console.log( roomId );
    });

    this.socket.on( 'onNewJoinRoom', function( newPlayer ){
      console.log( 'newPlayer:' );
      console.log( newPlayer );
    });

    this.socket.on( 'onCreateNewRoom', function( roomId ){
      app.appendRoomLink( roomId );
    });

    this.socket.on( 'onGetRooms', function( availableRooms ){
      console.log( 'availableRooms:' );
      console.log( availableRooms );
      for( var el in availableRooms ){
        app.appendRoomLink( availableRooms[el] );
      }
    });

    this.socket.emit( 'getRooms' );
  },
  appendRoomLink: function( roomId ){
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
};