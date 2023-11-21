import {Router} from 'express'
import {agregarDisp, verDisps, verDisp, eliminarDisp} from '../controllers/Dispositivo.controller.js'

const router = Router();

router.post('/agregarDisp', agregarDisp);

router.get('/verDisps', verDisps);

router.get('/verDisp/:id', verDisp);

router.put('/eliminarDisp', eliminarDisp);


export default router;