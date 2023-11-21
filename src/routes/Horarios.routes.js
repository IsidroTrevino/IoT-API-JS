import {Router} from "express";
import {agregarHorario, verHorarios, verHorario, eliminarHorario} from '../controllers/Horarios.controller'

const router = Router();

router.post('/agregarHorario', agregarHorario);

router.get('/verHorarios', verHorarios);

router.get('/verHorario/:id', verHorario);

router.put('/eliminarHorario', eliminarHorario);


export default router;