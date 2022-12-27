const { response, request } = require('express');


const esAdminRole = async(req = request, res = response, next) =>{

    if( !req.usuario){
        return res.status(500).json({
            msg: 'Se tiene que validar primero el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}

const tieneRol = (...roles) =>{
    return (req = request, res = response, next) => {
        if( !req.usuario){
            return res.status(500).json({
                msg: 'Se tiene que validar primero el token'
            });
        }

        if( !roles.includes(req.usuario.rol)){
            return res.status(500).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRol
}