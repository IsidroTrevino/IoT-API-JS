import {Router} from 'express'
import {agregarUsuario, obtenerUsuario} from '../controllers/Usuarios.controller.js'

const router = Router()

router.post('/agregarUsuario', agregarUsuario);

router.get('/obtenerUsuario', obtenerUsuario);

export default router;
