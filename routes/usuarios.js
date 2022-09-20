const {Router} = require('express');
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuarioPut);

router.post('/', usuarioPost);

router.delete('/', usuarioDelete);

module.exports= router;