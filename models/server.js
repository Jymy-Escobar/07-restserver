const express = require('express')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    middlewares(){
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.status(403).json({
                msg: 'get API'
            })
        })

        this.app.put('/api', (req, res) => {
            res.status(403).json({
                msg: 'put API'
            })
        })

        this.app.post('/api', (req, res) => {
            res.status(403).json({
                msg: 'post API'
            })
        })

        this.app.delete('/api', (req, res) => {
            res.status(403).json({
                msg: 'delete API'
            })
        })
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Ejecuntrando en http://localhost:' + this.port)
        });
    }
}

module.exports = Server;