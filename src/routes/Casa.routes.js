import {Router} from 'express'
import {verCasa, verCasas, agregarCasa, modificarCasa} from '../controllers/Casa.controller.js'

const router = Router();

router.get('/verCasas/:idUsuario', verCasas);

router.get('/verCasa/:idCasa', verCasa);

router.post('/agregarCasa', agregarCasa);

router.put('/modificarCasa', modificarCasa);

export default router;