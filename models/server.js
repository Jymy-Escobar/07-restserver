var cors = require('cors')
const express = require('express')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    middlewares(){
        this.app.use( cors());
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Ejecuntrando en http://localhost:' + this.port)
        });
    }
}

module.exports = Server;