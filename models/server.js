// Server de express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path'); 

const Sockets  = require('./sockets');
 

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // http server
        this.server = http.createServer( this.app )

        // Configuración del socket-server
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares() {   
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public')));
    }

    consigurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar middlewares
        this.middlewares() ;

        // Inicializar Sockets
        this.consigurarSockets();

        // inicializar el server
        this.server.listen( this.port, () => {
            console.log('Server corrientedo en puerto:', this.port);
        });
    }
}

module.exports = Server;