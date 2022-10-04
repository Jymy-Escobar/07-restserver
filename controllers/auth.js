const { response, json } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { GoogleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {
    
    const { correo, password} = req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ){
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - Email no es correcto.'
            })
        }

        //Si el usuario esta activo
        if ( !usuario.estado ){
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - El usuario no existe.'
            })
        }

        //Verificar la contrasenia
        const validaPassword = bcryptjs.compareSync( password, usuario.password);
        if(!validaPassword){
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - El password no es correcto.'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        
        res.status(200).json({
            usuario,
            token
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador del servicio'
        })
    }
}


const googleSingIn = async(req, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, img, correo} = await GoogleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                rol: "USER_ROLE",
            };
            usuario = new Usuario( data );
            await usuario.save();
        }

        //Si el usuairio en DB
        if( !usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.status(200).json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        })
    }
    
}

module.exports = {
    login,
    googleSingIn
}


