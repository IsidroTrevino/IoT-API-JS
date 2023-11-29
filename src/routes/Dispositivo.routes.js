import {Router} from 'express'
import {agregarDisp, verDisps, verDisp, eliminarDisp, modificarDisp} from '../controllers/Dispositivo.controller.js'

const router = Router();

router.post('/agregarDisp', agregarDisp);

router.get('/verDisps/:idCasa', verDisps);

router.get('/verDisp/:idDisp', verDisp);

router.put('/eliminarDisp', eliminarDisp);

router.put('/modificarDisp', modificarDisp);


export default router;