const {Router} = require('express');
const {check} = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');



const router = Router();

router.post('/login', [
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'El password debe de ser de 6 o más letras').isLength({ min: 6}),
    validarCampos
],login);


router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
], googleSingIn);

module.exports = router;