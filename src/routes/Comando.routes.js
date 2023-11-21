import {Router} from 'express'  
import {agregarComando, verComandos, verComandosPendientes, completarComando} from '../controllers/Comando.controller.js'

const router = Router();

router.post('/agregarComando', agregarComando);

router.get('/verComandos', verComandos);

router.get('/verComandosPendientes', verComandosPendientes);

router.put('/completarComando', completarComando);

export default router;

