(function( io ){
	app = {
		socket: null,
		boot: function(){
			var me = this;
			this.socket = io.Socket();//connect w/localhost:3000
			//callback on open
			this.socket.on( 'open', function(){
				me.onOpen();
			});
			//callback on message
			this.socket.on( 'message', function callback( message ){
				me.onMessage( message ); 
			});
		},
		onOpen: function(){
			this.socket.send( 'ping' );
		},
		onMessage: function( message ){
			document.getElementById( 'incomming-message' ).innerHTML = message;
		}
	};
	app.boot();
})( eio );