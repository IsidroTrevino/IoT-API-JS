import { Router } from "express";
import { reportarRegistro, verRegistros } from "../controllers/Registro.controller.js";

const router = Router();

router.post('/reportarRegistro', reportarRegistro);

router.get('/verRegistros/:idDisp', verRegistros);

export default router;