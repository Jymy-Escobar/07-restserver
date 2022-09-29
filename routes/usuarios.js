const {Router} = require('express');
const {check} = require('express-validator');
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {
 tieneRol,
 validarCampos,
 validarJWT
} = require('../middlewares')

const router = Router();


router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuarioPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password debe de ser de 6 o más letras').isLength({ min: 6}),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
] ,usuarioPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLES'),
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioDelete);

module.exports= router;