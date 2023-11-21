import {Router} from "express";
import {modificarHorario, agregarHorario, verHorarios, eliminarHorario} from '../controllers/Horarios.controller.js'

const router = Router();

router.post('/agregarHorario', agregarHorario);

router.get('/verHorarios', verHorarios);

router.put('/modificarHorario', modificarHorario);

router.put('/eliminarHorario', eliminarHorario);


export default router;