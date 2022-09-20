const {response} = require('express');

const usuariosGet = (req, res) => {

    const query = req.query;

    res.status(403).json({
        msg: 'get API - Controlador',
        query
    })
}

const usuarioPost = (req, res) => {

    const body = req.body;

    res.status(403).json({
        msg: 'post API',
        body
    })
}

const usuarioPut = (req, res) => {

    const id = req.params.id;

    res.status(403).json({
        msg: 'put API',
        id
    })
}

const usuarioDelete = (req, res) => {
    res.status(403).json({
        msg: 'delete API'
    })
}


module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}