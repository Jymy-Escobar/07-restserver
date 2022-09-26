const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req, res) => {
    const {limite = 5, desde =  0} = req.query;
    const query = { estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(limite)
    ]);

    res.status(200).json({
        total,
        usuarios
    })
}

const usuarioPost = async(req, res) => {
    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    //Cuardar en BD
    await usuario.save();

    res.status(200).json({
        msg: 'Usuario Registrado',
        usuario
    })
}

const usuarioPut = async(req, res) => {
    const id = req.params.id;
    const { _id, password, google, ...resto} = req.body;

    //TODO validar contra base de datos
    if ( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Usuario Actualizado',
        usuario
    })
}

const usuarioDelete = async(req, res) => {
    const {id} = req.params;
    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado logico
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        usuario
    })
}


module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}