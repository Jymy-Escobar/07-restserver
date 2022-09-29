

const  validarCampos  = require('../middlewares/validarCampos');
const  validarJWT  = require('../middlewares/validarJwt');
const  tieneRol  = require('../middlewares/validarRoles');


module.exports ={
    ...validarCampos,
    ...validarJWT,
    ...tieneRol
}