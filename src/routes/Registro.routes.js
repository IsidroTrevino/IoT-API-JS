import { Router } from "express";
import { reportarRegistro, verRegistros, borrarRegistros } from "../controllers/Registro.controller.js";

const router = Router();

router.post('/reportarRegistro', reportarRegistro);

router.get('/verRegistros/:idDisp', verRegistros);

router.get('/borrarRegistros/:idDisp', borrarRegistros);

export default router;