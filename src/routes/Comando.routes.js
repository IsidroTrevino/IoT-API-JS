import {Router} from 'express'  
import {agregarComando, verComandos, verComando, eliminarComando} from '../controllers/Comando.controller'

const router = Router();

router.post('/agregarComando', agregarComando);

router.get('/verComandos', verComandos);

router.get('/verComando/:id', verComando);

router.put('/eliminarComando', eliminarComando);

