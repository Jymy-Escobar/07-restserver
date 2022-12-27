const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponda al uid
        const usuario = await Usuario.findById( uid );
        req.usuario = usuario;

        if( ! usuario) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe'
            })
        }

        if( ! usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe'
            })
        }
        
        next();        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}

