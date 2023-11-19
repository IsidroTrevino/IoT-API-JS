import {Router} from 'express'
import {verCasa, verCasas, agregarCasa} from '../controllers/Casa.controller.js'

const router = Router();

router.get('/verCasas', verCasas);
router.get('/verCasa/:id', verCasa);
router.post('/agregarCasa', agregarCasa);


export default router